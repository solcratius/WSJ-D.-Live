<?php
/**
 * Template Name: Sponsors
 *
 * @package WordPress
 * @subpackage WSJDLIVE
 * @since WSJDLIVE 1.0
 */

get_header(); ?>

<?php

	$page = get_page_by_title('Sponsors');

	if ($page)
	{
		$id = $page -> ID;

		echo '<div class="sect section-light noBotSpacing">';
		echo '<div class="h3-wrapper"><h3><span class="thin">2015</span> WSJDLIVE<br />SPONSORS</h3></div>';
		echo '<p>' . get_field('sponsors_text', $id) . '</p><br /><br /></div>';
		echo '<div class="sect section-medium"><div class="sponsors-container">';

		$sponsor_object = get_field('sponsor_item');
		$h = 0;

		if ($sponsor_object)
		{
			foreach($sponsor_object as $post)
			{
				setup_postdata($post);

				echo '<div id="sponsor' . $h . '"><img src="';
				echo the_field('full_image') . '" /><p class="wide">';
				echo the_field('description') . '</p></div>';

				$h ++;
			}

			wp_reset_postdata();
		}

		echo '</div></div>';

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
