<?php
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
	add_action("widgets_init", array('myvimeo', 'register'));
	register_activation_hook( __FILE__, array('myvimeo', 'activate'));
	register_deactivation_hook( __FILE__, array('myvimeo', 'deactivate'));
	wp_enqueue_script("jquery", false, false, "1.3.2");	
	
	class myvimeo
	{		
		function activate()
		{
			$data = array('myvimeo_username' => 'etftw' ,'myvimeo_count' => 5, 'myvimeo_title' => 'Latest Vimeo Activity');
			if (! get_option('myvimeo'))
			{
				add_option('myvimeo' , $data);
			} 
			else 
			{
				update_option('myvimeo' , $data);
			}
		}
		  
		function deactivate()
		{
			delete_option('myvimeo');
		}

		function control()
		{
			$data = get_option('myvimeo');
			echo '<p><label>Vimeo username<br /></label><input name="myvimeo_username" type="text" value="'.$data['myvimeo_username'].'" /></p>';
			echo '<p><label>Title<br /></label><input name="myvimeo_title" type="text" value="'.$data['myvimeo_title'].'" /></p>';
			echo '<p><label>Number of entries to display<br /></label><input name="myvimeo_count" type="text" value="'.$data['myvimeo_count'].'" /></p>';
			
			if(isset($_POST['myvimeo_username']))
			{
				$data['myvimeo_username'] = attribute_escape($_POST['myvimeo_username']);
				$data['myvimeo_title'] = attribute_escape($_POST['myvimeo_title']);
				$data['myvimeo_count'] = attribute_escape($_POST['myvimeo_count']);
				update_option('myvimeo', $data);
			}
		}
		
		function widget($args) 
		{
			$pluginDirectory = WP_CONTENT_URL . "/plugins/" . plugin_basename(dirname(__FILE__));
			
			echo $args['before_widget'];
			echo $args['before_title'];
			$data = get_option('myvimeo');
			echo $data['myvimeo_title'];
			echo $args['after_title'];
			echo '<style>
					.myvimeo_activity_entry
					{
						padding-bottom: 10px;
					}
				</style>';
			echo '<script type="text/javascript" src="'.$pluginDirectory.'/myvimeo.js"></script>';
			echo '<div id="myVimeoActivityBox">Loading Vimeo activity...</div>';
			echo '<script type="text/javascript">';
			echo "jQuery('#myVimeoActivityBox').getVimeoActivity( '".$data['myvimeo_username']."', ".$data['myvimeo_count']." );";
			echo '</script>';
			echo $args['after_widget'];
		}
		
		function register()
		{
			register_sidebar_widget( 'myvimeo', array('myvimeo', 'widget'));  
			register_widget_control( 'myvimeo', array('myvimeo', 'control'));
		}
	}
?>
