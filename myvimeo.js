	/*
		Plugin Name: MyVimeo
		Plugin URI: https://wordpress.org/plugins/myvimeo/
		Description: A fast and customisable plugin to display your latest Vimeo activity on your WordPress blog.
		Author: etftw
		Version: 1.1.3
		Author URI: https://wordpress.org/plugins/myvimeo/
		
		MyVimeo WordPress Plugin
		Copyright (C) etftw
		
		This program is free software; you can redistribute it and/or
		modify it under the terms of the GNU General Public License
		as published by the Free Software Foundation; either version 2
		of the License, or (at your option) any later version.
		
		This program is distributed in the hope that it will be useful,
		but WITHOUT ANY WARRANTY; without even the implied warranty of
		MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
		GNU General Public License for more details.
		
		You should have received a copy of the GNU General Public License
		along with this program; if not, write to the Free Software
		Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
	*/
	(function($)
	{		
		function processTags(tags)
		{
			var regex = /([a-zA-Z0-9]+)(,)/g;
			return tags.replace(regex, '<a href="http://vimeo.com/tag:$1" target="_blank">$1</a> ');
		}
		
		function addTagActivity(activity)
		{
			var entry;
			entry = '<div class="myvimeo_activity_entry"><a href="' + activity.user_url + '" target="_blank">' + activity.user_name + '</a> tagged <a href="' + activity.video_url + '" target="_blank">' + activity.video_title + '</a> with: ' + processTags(activity.action_tags) + "</div>";
			return entry;
		}
		
		function addCommentActivity(activity)
		{
			var entry;
			entry = '<div class="myvimeo_activity_entry"><a href="' + activity.user_url + '" target="_blank">' + activity.user_name + '</a> posted a comment on <a href="' + activity.video_url + '" target="_blank">' + activity.video_title + '</a></div>';
			return entry;
		}
		
		function addLikeActivity(activity)
		{
			var entry;
			entry = '<div class="myvimeo_activity_entry"><a href="' + activity.user_url + '" target="_blank">' + activity.user_name + '</a> likes <a href="' + activity.video_url + '" target="_blank">' + activity.video_title + '</a></div>';
			return entry;
		}
		
		function addCreatedActivity(activity)
		{
			var entry;
			entry = '<div class="myvimeo_activity_entry"><a href="' + activity.user_url + '" target="_blank">' + activity.user_name + '</a> created <a href="http://vimeo.com/channels/search:' + activity.video_title + '" target="_blank">' + activity.video_title + '</a></div>';
			return entry;
		}
		
		function addSubscribedActivity(activity)
		{
			var entry;
			entry = '<div class="myvimeo_activity_entry"><a href="' + activity.user_url + '" target="_blank">' + activity.user_name + '</a> subscribed to <a href="http://vimeo.com/channels/search:' + activity.video_title + '" target="_blank">' + activity.video_title + '</a></div>';
			return entry;
		}
		
		function addUploadedActivity(activity)
		{
			var entry;
			entry = '<div class="myvimeo_activity_entry"><a href="' + activity.user_url + '" target="_blank">' + activity.user_name + '</a> uploaded <a href="' + activity.video_url + '" target="_blank">' + activity.video_title + '</a></div>';
			return entry;
		}
		
		$.fn.getVimeoActivity = function (username, count)
		{
			$.getJSON(
				'http://vimeo.com/api/v2/activity/' + username + '/user_did.json?callback=?',
				function(data)
				{
					$('#myVimeoActivityBox').empty();
					$.each(data, function(i, activity)
					{
						if(i < count )
						{
							if( activity.type == 'add_comment' )
							{
								$('#myVimeoActivityBox').append(addCommentActivity(activity));
							}
							
							if( activity.type == 'add_tags' )
							{
								$('#myVimeoActivityBox').append(addTagActivity(activity));
							}
							
							if( activity.type == 'like' )
							{
								$('#myVimeoActivityBox').append(addLikeActivity(activity));
							}
							
							if( activity.type == 'upload' )
							{
								$('#myVimeoActivityBox').append(addUploadedActivity(activity));
							}
							
							if( activity.type == 'channel_create' )
							{
								$('#myVimeoActivityBox').append(addCreatedActivity(activity));
							}
							
							if( activity.type == 'channel_subscribe' )
							{
								$('#myVimeoActivityBox').append(addSubscribedActivity(activity));
							}
						}
						else
						{
							return false;
						}
					});
				});
		}
	})(jQuery);
