<?php
/**
 * Template Name: Schedule
 *
 * @package WordPress
 * @subpackage WSJDLIVE
 * @since WSJDLIVE 1.0
 */

get_header(); ?>

<?php

	$page = get_page_by_title('Schedule');

	if ($page)
	{
		$id = $page -> ID;

		echo '<div class="sect section-light noBotSpacing">';
		echo '<div class="h3-wrapper"><h3><span class="thin">PROGRAM</span> SCHEDULE</h3></div>';
		echo '<p>' . get_field('schedule_text', $id) . '</p><br /><br /></div>';
		echo '<div class="sect section-medium noBotSpacing">';

		$schedule_object = get_field('schedule_item');

		if ($schedule_object)
		{
			foreach($schedule_object as $post)
			{
				setup_postdata($post);

				echo '<div class="schedule-container alignL"><h4>';
				echo get_the_title( $post -> ID ) . '</h4>';
				echo '<div class="pixel-liner">&nbsp;</div><ul>';

				for ($h = 0; $h <= 27; $h ++)
				{
					if (get_field('time' . $h, $post -> ID) != "no")
					{
						echo '<li><div class="time">';
						echo get_field('time' . $h, $post -> ID) . '</div><div>';
						echo get_field('description' . $h, $post -> ID) . '</div></li>';
					}
				}

				echo '<div class="clearBoth"></div></ul></div>';
			}

			wp_reset_postdata();
		}

		echo '<br /><br /></div>';

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
