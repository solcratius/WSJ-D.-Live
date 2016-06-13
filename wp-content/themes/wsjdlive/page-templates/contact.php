<?php
/**
 * Template Name: Contact
 *
 * @package WordPress
 * @subpackage WSJDLIVE
 * @since WSJDLIVE 1.0
 */

get_header(); ?>

<?php

	$page = get_page_by_title('Contact');

	if ($page)
	{
		$id = $page -> ID;

		echo '<div class="sect section-light noBotSpacing">';
		echo '<div class="h3-wrapper"><h3>CONTACT</h3></div>';
		echo '<h4>GENERAL INFORMATION</h4>' . get_field('general_info', $id);

		echo '<h4 class="addTopSpacing">PRESS</h4>' . get_field('press', $id);

		echo '<h4 class="addTopSpacing">VENUE</h4>' . get_field('venue', $id);
		echo '<a class="tealBoxBtn mapBtn" href="#';
		echo get_field('google_map_link', $id) . '">VIEW MAP</a>';

		echo '<h4 class="addTopSpacing">SPONSORS</h4>';
		echo get_field('sponsors', $id) . '<br /><br /></div>';
		
		echo '<div class="pixel-liner">&nbsp;</div>';


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
