# Devheat_Beta_Dev_and_Daemons

## What does it do?
The chrome extension displays the likes and dislikes on a youtube video without the requirement of the user opening it. This saves the users' time since it allows them to quickly judge if a video is good or not by simply viewing its like and dislike count. The extension also calculates the percentage of likes out of the total responses. A like percentage greater than 98 is highlighted in green and labeled "Recommended", a like percentage of less than 40 is highlighted in red and a video with not responses is marked in grey, along with their like and dislike counts. Rest of the videos simply display their like and dislike counts.

## Basic Functions
* likedislikeFetch:
  It takes the video ID and the corresponding video's element as arguments. The function calls the returnyoutubedislike API and it fetches the like and dislike count of the video of the given ID. These counts and corresponding icons are added to the youtube video using the given video element.

* getVideoUrls:
  This function does not take any argument. It searchs the entire web page's code and looks for elements with ID 'video-title'. It then extracts the link to that video and returns the entire list.

* getVideoId:
  It takes a video URL as an argument and extracts it's ID from this URL and returns it.

* insertIcon:
  It takes only one argument, the path to the icon to be added.

* removeDuplicates:
  It takes an array as an argument, removes the duplicate elements and returns this new array.

* observeVideos:
  This is the function where all the aforementioned functions come into the picture. In this function, using loops and conditional statements, the like and dislike counts and their corresponding icons are inserted into the web page's code using the likedislikeFetch which in turn calls insertIcon function, all the while running a loop and mainting a 'state' array that checks if the given video has already been observed or not.

## Event Handler
The main piece of code that calls the observeVideos function is the Event Handler. The event handler's event is 'scroll' as soon as the user scrolls down and new videos are loaded, the handler calls the observeVideos function and leads to the subsequent insertion of the like and dislike counts of these new videos into the web page.

## Installation and Use
* Clone this GitHub repository onto your device
* Open your chrome browser and look at the upper right corner of your browser window
* Just below the minimize icon, the "Extension" icon can be seen
* Click on the icon and the Extensions page shall open in your browser window
* Toggle the "Developer Mode" at the upper right corner of the window and you shall see three options appear
* Select the "Load Unpacked" option and a dialogue box shall open
* Navigate to the address where this repository has been cloned and select it by clicking on "Select Folder"
* You shall now see the chrome extension enabled in your browser

## Instructions for contributions and development
Several new features are supposed to be added. The next feature is to enable this feature on the Home Page as well as on watch page, where there are videos below the currently playing video.
The User Interface has to be simple and intutive and it interference in the users' interaction with the main website should be kept to a minimum.

##
Link to the demonstration video: https://drive.google.com/file/d/1LfhHykks_Mvvptf_cwsn4govpChr3XXr/view?usp=drive_link
This project was developed as a solution to the problem statement provided by the organizers of Devheat Beta, GDSC IIIT Surat.
