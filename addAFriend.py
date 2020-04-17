import json

##This function is used to add a friend to the user's friend list
def addFriendToJSON(topic, ip):
  try:
    jsonFile = open("topics.json", "r") # Open the JSON file for reading
    data = json.load(jsonFile) # Read the JSON into the buffer
    jsonFile.close() # Close the JSON file
    friends = []
    for friend in data: ##lists of all of the user's friends
        friends.append(friend["name"])
    if topic not in friends:  ## only add if the friend is not yet on the list
            newTopic = {}
            newTopic["name"] = topic

            ## Working with buffered content
            data.append(newTopic)
            ## Save our changes to JSON file
            jsonFile = open("topics.json", "w+")
            jsonFile.write(json.dumps(data))
            jsonFile.close()
            print("new friend added")
    else:
       print(topic + " already exists")
  except Exception as e:
     print(e)

specialTopic = ["strife", "envy", "milk", "meat", "food", "soon", "gospel", "world", "head", "tail", "redeem", "save", "holy", "strength", "power", "hope", "adultery", "wife", "husband", "wise", "fire", "water", "hell", "perfect", "temple", "love", "wisdom", "understanding", "knowledge", "wrath", "fear", "mercy", "grace", "sanctuary", "pray", "time", "lamb", "Pharisee", "evil", "angel", "patience", "praise", "blessing", "heaven", "forgive", "faith", "idol", "Jesus", "sabbath", "God", "overcome", "sin"];
for topic in specialTopic:
    addFriendToJSON(topic, "1")
