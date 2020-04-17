import sqlite3
import bibleXMLBuilder
import xml.etree.ElementTree as ET
import time

def addBooks(bookName):

    tree = ET.parse('bible.xml')
    root = tree.getroot()
    book = ET.Element("book", name=bookName)
    root.append(book)
    tree.write('bible.xml')

def addBookChapters(bookNumber, chapterNumber):

    tree = ET.parse('bible.xml')
    root = tree.getroot()
    book = root[bookNumber] #0 is genesis
    chapter = ET.SubElement(book, "chapter", number=chapterNumber)
    root.append(book)
    tree.write('bible.xml')

def addVerses(rows):
    tree = ET.parse('bible.xml')
    root = tree.getroot()
    for row in rows:
        bookNumber = row[0]-1
        chapterNumber = row[1]
        verseID = str(row[2])
        verseNumber = str(row[3]).strip()
        word = row[4]
        book = root[bookNumber] #0 is genesis
        chapter = book[chapterNumber-1]
        verse = ET.SubElement(chapter, "verse", id=verseID, number=verseNumber)
        verse.text = word
        print (verseID + ". " + verse.text)
        #root.append(book)
    tree.write('bible.xml')

def createXMLBible():
    #print (tableName)
    db = sqlite3.connect('kjvios.db')
    cursor = db.cursor()
    #query = "select id, bookID, shortName, chapter, verse, word from kjv limit 10"
    #query = "select shortName from books"
    #query = "select distinct bookID, chapter from kjv"
    query = "select bookID, chapter, id, verse, word from kjv"

    cursor.execute(query)
    rows = cursor.fetchall()
    #for row in rows:
        #id = row[0]
        #bookID = row[1]
        #bookName = row[2]
        #chapter = row[3]
        #verse = row[4]
        #word = row[5]
        #word.strip()
        #print(word)
        #addVerse(bookName, chapter, verse, word)
        #addBooks(row[0])
        #addBookChapters(row[0]-1, str(row[1]))
    addVerses(rows)
    db.commit()
    db.close()

createXMLBible()

def insertBook(book): #shortnames
    db = sqlite3.connect('kjvios.db')
    cursor = db.cursor()
    cursor.execute('''INSERT INTO books(shortName) VALUES(?)''', (book,))
    db.commit()
    db.close()

def updateBook(book, id): #abbNames
    db = sqlite3.connect('kjvios.db')
    cursor = db.cursor()
    cursor.execute('''UPDATE books SET abbName = ? where bookID = ?''', (book, id))
    db.commit()
    db.close()

def updateBookID(id): #update bookID in kjv table
    print (id, book)
    db = sqlite3.connect('kjvios.db')
    cursor = db.cursor()
    cursor.execute(''' update fullNames set bookID = ? where book=?''', (id, book,))
    db.commit()
    db.close()

def updateID(tableName, id):
    db = sqlite3.connect('kjvios.db')
    cursor = db.cursor()
    #query = "drop table " + name
    #query = "update kjv set bookID= " + id + " where book like +  
    query = "update table " + tableName + " set id= " + id 
    cursor.execute(query)
    db.commit()
    db.close()
    print (id + " " + name + " added")

#updates bookID of kjv table
def setBookID(lines):
    x = 1
    for line in lines:
       updateBookID(line, x)
       x = x + 1

def createABook(newname, oldname):
    db = sqlite3.connect('kjvios.db')
    cursor = db.cursor()
    #query = "drop table " + name
    #query = "update kjv set bookID= " + id + " where book like +  
    query = "create table " + newname + " (id integer primary key autoincrement, bookID int, book text, chapter text, verse text, word text, image text, testament text, shortName text, abbName text)" 
    cursor.execute(query)
    db.commit()
    query2 = "insert into " + newname + " (bookID, book, chapter, verse, word, image, testament, shortName, abbName) select bookID, book, chapter, verse, word, image, testament, shortName, abbName from " + oldname
    cursor.execute(query2)
    db.commit()
    query3 = "drop table " + oldname
    cursor.execute(query3)
    db.commit()
    query4 = "create table " + oldname + " as select * from " + newname
    cursor.execute(query4)
    db.commit()
    query5 = "drop table " + newname
    cursor.execute(query5)
    db.commit()
    db.close()
    
    print (str(id) + " " + oldname + " added")

def updateFullName(bookID, tableName):
    #print (tableName)
    db = sqlite3.connect('kjvios.db')
    cursor = db.cursor()
    query = "select count(*) as totalVerses from " + tableName
    cursor.execute(query)
    rows = cursor.fetchall()
    for row in rows:
        totalVerses = row[0]

        updateTotalVerses(bookID, tableName, totalVerses)
    db.commit()
    db.close()

def getTotalChapters(bookID, tableName):
    db = sqlite3.connect('kjvios.db')
    cursor = db.cursor()
    query = "select distinct chapter from " + tableName
    cursor.execute(query)
    rows = cursor.fetchall()
    totalChapters = ""
    for row in rows:
       totalChapters = row[0]
    updateTotalChapters(bookID, totalChapters)
    db.commit()
    db.close()    

def getAbbName():
    db = sqlite3.connect('kjvios.db')
    cursor = db.cursor()
    query = "select bookID, abbName from books"
    cursor.execute(query)
    rows = cursor.fetchall()
    for row in rows:
        bookID = row[0]
        abbName = row[1]
        print(str(bookID) + abbName)
        updateAbbName(bookID, abbName)
    db.commit()
    db.close()
    

def updateAbbName(bookID, abbName):
   db = sqlite3.connect('kjvios.db')
   cursor = db.cursor()
   query = "update fullNames2 set abbName ='" + str(abbName) + "' where bookID=" + str(bookID)
   cursor.execute(query)
   db.commit()
   db.close()


def updateTotalChapters(bookID, totalChapters):
   db = sqlite3.connect('kjvios.db')
   cursor = db.cursor()
   query = "update fullNames2 set totalChapters = " + str(totalChapters) + " where bookID=" + str(bookID)
   cursor.execute(query)
   db.commit()
   db.close()

def updateTotalVerses(bookID, tableName, totalVerses):
    db = sqlite3.connect('kjvios.db')
    cursor = db.cursor()
    query = "update fullNames2 set totalVerses = " + str(totalVerses) + " where bookID=" + str(bookID)
    cursor.execute(query)
    db.commit()
    db.close()

def getBookNames():
    booklist = []
    db = sqlite3.connect('kjvios.db')
    cursor = db.cursor()
    cursor.execute('''SELECT * FROM BibleInfo''')
    rows = cursor.fetchall()
    for row in rows:
        #shortName = row[1]
        tableName = row[2]
        tableName_copy = tableName + "_copy" 
        #shortName = shortName.replace(" ", "")
        #shortName = "_" + shortName
        #pair = [bookID, tableName]
        createABook(tableName_copy, tableName)
        #booklist.append(tableName)
    db.commit()
    db.close()
    #for name in booklist:
        #print(name)
        #updateFullName(id, name)
     #   updateFullName(name)

shortNames = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', 
'2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 
'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 
'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 
'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts (of the Apostles)', 
'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 
'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 
'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation']

#getBookNames()
#getBookNames()
#getTotalChapters("Book_1")
#setBookID(shortNames)
#print(lines)

#updates abb names to books of the bible
def setAbbNames():
    file = open("abbNames", "r")
    lines = file.readlines()
    x = 1
    for line in lines:
       line = line.split("\t")
       name = (line[1].strip())
       updateBookID(name, x)
       x = x +1
