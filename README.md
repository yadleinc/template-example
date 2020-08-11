# Use custom templates to display search results in Yadle
The Yadle "template" API methods allow users to use custom HTML/CSS/JavaScript to create a template for displaying search results. Once created, each template will appear in the view drop-down menu of the search page of the web app. This repo contains an overview of how these templates work, as well as a working example of a template.

### Overview of templates work:
In the most basic sense, the way this feature works is that the Yadle web app uses a custom event to pass search results to your template. Therefore, your template simply needs to listen for the custom event in order to receive the search results. Once the results have been received, your template can display them however you see fit. You can simply display the data with plain JavaScript, or you could use a library like React or Vue.

The starting point of a template will be a single JavaScript file (must be called index.js) that you provide and which Yadle will insert into the web app. You can include additional files (HTML/CSS/JavaScript) and they will be packaged with the web app, but you will be responsible for importing them into your template (we provide examples of how to do this).

Finally, it is important to note that when you insert your content into the web page, you must start by appending it to the '#custom-template' element. This ensures that any content you render will be inserted into the correct location on the page.

# Creating a template:
To create a template, you must use the Yadle API to create an entry for the template and then add the template files themselves. You can view full documentation for the template API methods here: https://api.yadle.com/?version=latest#4626c901-fe1e-42cc-a66f-3cd96c417253

## Step 1: Create an entry for the template
**POST {{server}}/yadle/v2/template**

This method creates a new template object. This object defines the name of the template, the display name of the template, and whether or not it is enabled.
Example POST body:  
```
{
  "template_name":"Template_1",
  "display_name":"My New View",
  "enabled": true
}
```
##### Field descriptions:
**template_name**: Must be a string that contains only letters, numbers, and underscores. This value cannot be changed later on. It is only used internally.  
**display_name**: Can be any string. It can be changed later on. This is the name that will be displayed in the web app.  
**enabled (optional)**: Set to true by default. Must use boolean values, not strings.  

Note that you still must upload the template code itself (step 2).

## Step 2: Upload template files

**PUT {{server}}/yadle/v2/template/{{template_name}}/file**  

Upload a .zip file containing the template code.
The file must be named 'src.zip'. The root folder of the zipped content must be named 'src'. The root JavaScript file must be called “index.js” and located at “/src/index.js”. You can include any other files you may need, but as mentioned above, you will be responsible for loading them into your application.

Here is an example of how to upload your file in python. Note that we are using a “form” to send the data, and that the file must be listed under a field called “file” (python requests documentation here).
```
import requests

# replace this url with your API url
url = "https://sample_organization1.yadle.com/yadle/v2/template/{{templateid}}/file"
payload = {}
 
headers = {
  'x-app-id': 'your_app_id’,
  'Authorization': 'valid_bearer_from_login'
}
 
files = [
 ('file', open('/home/user1/documents/my_template/Template_1/src.zip','rb'))
]
headers= {}
response = requests.request("PUT", url, headers=headers, data = payload, files = files)
``` 


Once your template has been uploaded, Yadle will unzip it and insert it into the web app. Your template will be listed in the dropdown menu of the search page using the <display_name> that you used when you created the template. You can then use the browser DevTools for any debugging.

# How to write the template itself:
This repository contains an example template that uses React to display search results. It is relatively simple in that it merely listens for search results, displays the name of each result, and then applies some CSS. However, it should give you a decent understanding of how to structure your code.

To reiterate, the key points are:
1. /src/index.js must be the starting point of your template.  
2. Your code must create an event listener. The name of the event your code must listen for will be synonymous with the template_name you used when you created the template. So if you called the template “Template_1”, you must listen for “Template_1”.  
3. When you insert your content into the web page, you must start by appending it to the '#custom-template' element.  


### Other notes:

##### Displaying  Thumbnails

The search results do not contain any thumbnails themselves, so you will be responsible for retrieving the thumbnails for each search result and inserting them yourself.  
See the Yadle API docs for more info: https://api.yadle.com/?version=latest#13e13355-7e70-4ca7-a7f4-b39999e83193
