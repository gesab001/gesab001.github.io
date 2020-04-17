import xml.etree.ElementTree as ET
import time;

def addVerse(bookName, chapterNumber, verseNumber, word):
    tree = ET.parse('bible.xml')
    root = tree.getroot()
    book = root[0]
    chapter = book[0]
    print(chapter.attrib)
    verse = ET.SubElement(chapter, "verse", number=verseNumber)
    verse.text = word
    tree.write('bible.xml')

def addBooks(bookName):

    tree = ET.parse('bible.xml')
    root = tree.getroot()
    book = ET.Element("book", name=bookName)
    root.append(book)
    tree.write('bible.xml')

#addVerse("Genesis", "1", "2", "and god said")
#addBooks("Genesis")
