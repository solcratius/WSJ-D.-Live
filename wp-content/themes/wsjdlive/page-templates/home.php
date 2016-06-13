<?php
/**
 * Template Name: Home
 *
 * @package WordPress
 * @subpackage WSJDLIVE
 * @since WSJDLIVE 1.0
 */

get_header(); ?>

<?php

	$page = get_page_by_title('Home');

	if ($page)
	{
		$id = $page -> ID;

		echo '<div class="sect section-light">';
		echo '<div class="h3-wrapper"><h3>WSJDLIVE <span class="thin">2015</span></h3></div>';
		echo '<p>' . get_field('intro_text', $id) . '</p><div class="thumb-container">';

		$video_object = get_field('video_item');

		if ($video_object)
		{
			foreach($video_object as $post)
			{
				setup_postdata($post);

				echo '<a class="videoBtnBox" href="#"><span class="data">';
				// echo the_field('video_link') . '"><img src="';
				echo the_field('video_link') . '</span><img src="';
				echo the_field('thumbnail') . '" />';
				echo '<div class="playIcon"> </div></a>';
			}

			wp_reset_postdata();
		}

		echo '</div><p>' . get_field('intro_tagline', $id) . '</p>';
		echo '<div class="pixel-liner"><a class="tealBoxBtn" href="';

		$aboutID = get_page_by_title('About') -> ID;
		echo esc_url( get_permalink($aboutID) ) . '#highlights" data-role="ajax">2015 HIGHLIGHTS</a></div></div>';

		echo '<div id="speakers" class="sect section-medium">';
		echo '<div class="h3-wrapper"><h3><span class="thin">2015</span> SPEAKERS</h3></div>';
		echo '<div class="speakers-container">';

		$speaker_object = get_field('speaker_item');

		if ($speaker_object)
		{
			foreach($speaker_object as $post)
			{
				setup_postdata($post);

				echo '<a href="#" class="speaker"><span class="data"><span>';
				echo the_field('name') . '</span><span>';
				echo the_field('title') . '</span><span>';
				echo the_field('company') . '</span><span>';
				echo the_field('multiple_title') . '</span><span>';
				echo the_field('description') . '</span><span>';
				echo the_field('full_photo') . '</span></span><img src="';
				echo the_field('thumbnail') . '" /><div class="card"><div class="bg"> </div>';
				echo '<div class="speaker-bio"><span class="name">';
				echo the_field('name') . '</span><span class="title">';
				echo the_field('title');
				if (get_field('multiple_title', $post -> ID)) echo ', </span><span class="title">';
				else echo '</span><span class="company">';
				echo the_field('company') . '</span></div></div></a>';
			}
			
			wp_reset_postdata();
		}

		echo '<div class="clearBoth"></div></div>';
		echo '<div class="pixel-liner"><a class="tealBoxBtn" href="';

		$speakersID = get_page_by_title('Speakers') -> ID;
		echo esc_url( get_permalink($speakersID) ) . '" data-role="ajax">MORE</a></div></div>';
		
		echo '<div class="sect section-dark">';
		echo '<div class="h3-wrapper"><h3>' . get_field('custom_page_title', $aboutID) . '</h3></div>';
		echo '<p>' . get_field('custom_page_content', $aboutID) . '</p>';
		echo '<div class="pixel-liner"><a class="tealBoxBtn" href="';
		echo get_field('custom_page_btn_link', $aboutID) . '" data-role="ajax">' . get_field('custom_page_btn_text', $aboutID) . '</a></div></div>';

		// echo '<div id="highlights" class="sect section-dark">';
		// echo '<div class="h3-wrapper"><h3><span class="thin">2014</span> HIGHLIGHTS</h3></div>';
		// echo '<p>' . get_field('highlights_text', $id) . '</p><div class="thumb-container">';

		// $photo_object = get_field('photo_item');

		// if ($photo_object)
		// {
		// 	foreach($photo_object as $post)
		// 	{
		// 		setup_postdata($post);

		// 		echo '<a class="photoBtnBox" href="#"><span class="data">';
		// 		echo the_field('full_image') . '</span><img src="';
		// 		echo the_field('thumbnail') . '" /><div class="cover"> </div></a>';
		// 	}

		// 	wp_reset_postdata();
		// }

		// echo '</div><div class="pixel-liner addTopSpacing"><a class="tealBoxBtn" href="';
		// echo esc_url( get_permalink($aboutID) ) . '#highlights" data-role="ajax">VIEW MORE PHOTOS</a></div></div>';

		if (get_field('sponsors_on', $id))
		{
			echo '<div class="sect section-light noBotSpacing">';
			// echo '<div class="h3-wrapper"><h3><span class="thin">2015</span> SPONSORS</h3></div><div class="sponsor-container">';
			echo '<div class="h3-wrapper"><h3>SPONSORS</h3></div><div class="sponsor-container">';

			$sponsorID = get_page_by_title('Sponsors') -> ID;
			$sponsor_object = get_field('sponsor_item');
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
