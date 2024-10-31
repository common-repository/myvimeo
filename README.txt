=== MyVimeo ===
Contributors: etftw
Tags: widget, vimeo, jsonp, jquery, activity
Requires at least: 2.9
Tested up to: 2.9
Stable tag: trunk


A fast and customisable plugin to display your latest Vimeo activity on your WordPress blog.

== Description ==
MyVimeo is a WordPress widget which allows you to display your latest activity on Vimeo in the sidebar of your blog; activities include:

* Channels you have created
* Channels you have joined
* Videos that you have liked
* Videos that you have tagged
* Your latest uploaded videos
* Your latest video comments

MyVimeo also allows you to specify how many activities you wish to display and allows you to customise the title of the plugin in the sidebar to whatever you want.


== Installation ==

1. Unzip the zip file and upload the entire folder to wp-content/plugins.
1. Activate the plugin through the 'Plugins' menu in WordPress

= Widget Enabled Themes = 
* Go To The Widget Screen Under Appearance. 
* Add The MyVimeo Widget.
* Add Your Vimeo username.
* Enter the number of activities you want to display
* Save your changes


= Non Widget Enabled Themes =
* Add the jquery.1.3.2.min.js file to the head of your document
* Add The following HTML to your sidebar, replacing YOUR_USERNAME with your actual Vimeo username, ACTIVITY_COUNT with the number of activities you wish to display and 'PLUGIN_DIRECTORY' with the location of the MyVimeo plugin
* <pre>
&lt;h2 class=&quot;widgettitle&quot;&gt;Latest Vimeo Activity&lt;/h2&gt;
&lt;div id=&quot;myVimeoActivityBox&quot;&gt;Fetching latest activities...&lt;/div&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;PLUGIN_DIRECTORY/jquery-1.3.2.min.js&quot;&gt;&lt;/script&gt;<br />
&lt;script type=&quot;text/javascript&quot; src=&quot;PLUGIN_DIRECTORY/myvimeo.js&quot;&gt;&lt;/script&gt;<br />
&lt;script&gt;jQuery('#myVimeoActivityBox').getVimeoActivity( 'YOUR_USERNAME', ACTIVITY_COUNT );&lt;/script&gt;
</pre>

== Changelog ==
= 1.1.3 =
* Added new channel creation and joining as supported activities.

= 1.1.2 =
* Finished creating PHP module and implemented main functionality.

== Upgrade Notice ==
= 1.1.3 =
The first fully functional release.

== Screenshots ==
1. View of the widget in use.
2. View of the customisation panel.

