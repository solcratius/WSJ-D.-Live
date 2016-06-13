<?php
/**
 * Template Name: About
 *
 * @package WordPress
 * @subpackage WSJDLIVE
 * @since WSJDLIVE 1.0
 */

get_header(); ?>

<?php

	$page = get_page_by_title('About');

	if ($page)
	{
		$id = $page -> ID;

		echo '<div class="sect section-light">';
		echo '<div class="h3-wrapper"><h3><span class="thin">ABOUT</span> WSJDLIVE 2015</h3></div>';
		echo '<p>' . get_field('about_text', $id) . '</p><div class="thumb-container">';

		$video_object = get_field('video_item');

		if ($video_object)
		{
			foreach($video_object as $post)
			{
				setup_postdata($post);

				echo '<a class="videoBtnBox" href="#"><span class="data">';
				echo get_field('video_link', $post -> ID) . '</span><img src="';
				echo the_field('thumbnail') . '" />';
				echo '<div class="playIcon"> </div></a>';
			}

			wp_reset_postdata();
		}

		echo '</div></div><div id="highlights" class="sect section-dark">';
		echo '<div class="h3-wrapper"><h3><span class="thin">2015</span> HIGHLIGHTS</h3></div>';
		echo '<p>' . get_field('highlights_text', $id) . '</p><div class="thumb-container">';

		$h_photo_object = get_field('highlight_photo_item');

		if ($h_photo_object)
		{
			foreach($h_photo_object as $post)
			{
				setup_postdata($post);

				echo '<a class="photoBtnBox" href="#"><span class="data">';
				echo the_field('full_image') . '</span><img src="';
				echo the_field('thumbnail') . '" /><div class="cover"> </div></a>';
			}

			wp_reset_postdata();
		}

		echo '</div><div class="thumb2-container">';

		$h_video_object = get_field('highlight_video_item');

		if ($h_video_object)
		{
			foreach($h_video_object as $post)
			{
				setup_postdata($post);

				echo '<a class="videoBtnBox" href="#"><span class="data">';
				echo get_field('video_link', $post -> ID) . '</span><img src="';
				echo the_field('thumbnail') . '" /><div class="playIcon"> </div></a>';
			}

			wp_reset_postdata();
		}

		echo '</div></div><div class="sect section-medium">';
		echo '<div class="h3-wrapper"><h3>' . get_field('custom_page_title', $id) . '</h3></div>';
		echo '<p>' . get_field('custom_page_content', $id) . '</p>';
		echo '<div class="pixel-liner"><a class="tealBoxBtn" href="';
		echo get_field('custom_page_btn_link', $id) . '" data-role="ajax">' . get_field('custom_page_btn_text', $id) . '</a></div></div>';
		

		if (get_field('sponsors_on', $id))
		{
			echo '<div class="sect section-light noBotSpacing">';
			echo '<div class="h3-wrapper"><h3>SPONSORS</h3></div><div class="sponsor-container">';

			$sponsorID = get_page_by_title('Sponsors') -> ID;
			$homeID = get_page_by_title('Home') -> ID;
			$sponsor_object = get_field('sponsor_item', $homeID);
			$i = 0;

			if ($sponsor_object)
			{
				foreach($sponsor_object as $post)
				{
					setup_postdata($post);

					// echo '<a class="sponsor" data-role="ajax" href="';
					// echo esc_url( get_permalink($sponsorID) ) . '#sponsor';
					// echo $i . '"><img src="';
					// echo the_field('thumbnail');
					// echo '" /></a>';
					echo '<a class="sponsor" href="';
					echo the_field('url') . '" target="_blank"><img src="';
					echo the_field('thumbnail');
					echo '" /></a>';

					$i ++;
				}

				wp_reset_postdata();
			}

			echo '<div class="clearBoth"></div></div></div>';
		}
	}
?>

<?php get_footer(); ?>
