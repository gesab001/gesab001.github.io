import xml.etree.ElementTree as ET

specialTopic = ["lamb", "Pharisee", "evil", "angel", "patience", "praise", "blessing", "heaven", "forgive", "faith", "idol", "Jesus", "sabbath", "God", "overcome", "sin"];

def addTopic(topicName):

    tree = ET.parse('topics.xml')
    root = tree.getroot()
    topics = []
    topicSearch = root.findall('item')
    for item in topicSearch:
        topics.append(item.text)
    if topicName not in topics:
       topic = ET.SubElement(root, "item")
       topic.text = topicName
       root.append(topic)
       tree.write('topics.xml')
       print(topicName + " added successfully")
    else:
       print(topicName + " already exists")

for topic in specialTopic:
   addTopic(topic)

while True:
  topic = input("enter topic: ")
  addTopic(topic)
