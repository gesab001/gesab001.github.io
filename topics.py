import json

specialTopic = ["strife", "envy", "milk", "meat", "food", "soon", "gospel", "world", "head", "tail", "redeem", "save", "holy", "strength", "power", "hope", "adultery", "wife", "husband", "wise", "fire", "water", "hell", "perfect", "temple", "love", "wisdom", "understanding", "knowledge", "wrath", "fear", "mercy", "grace", "sanctuary", "pray", "time", "lamb", "Pharisee", "evil", "angel", "patience", "praise", "blessing", "heaven", "forgive", "faith", "idol", "Jesus", "sabbath", "God", "overcome", "sin"];

try:
    jsonFile = open("topics.json", "r") # Open the JSON file for reading
    data = json.load(jsonFile) # Read the JSON into the buffer
    jsonFile.close() # Close the JSON file
    newFriend = {}
    newFriend["name"] = "user"
    newFriend["ipAddress"]= "ip"
    newFriend["statusText"] ="no post"
    newFriend["profilePicture"]= "me.jpg"
    ## Working with buffered content
    data.append(newFriend)
    ## Save our changes to JSON file
    jsonFile = open("topics.json", "w+")
    jsonFile.write(json.dumps(data))
    jsonFile.close()
    print("new topic added")

except Exception as e:
     print(e)

