<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other 'pages' on your WordPress site will use a different template.
 *
 * @package WSJDLIVE
 */

get_header(); ?>

<?php

	$id = get_the_ID();

	if ($id)
	{
		echo '<div class="sect section-light noBotSpacing">';
		echo '<div class="h3-wrapper"><h3>' . get_field('page_title', $id) . '</h3></div>';
		echo get_field('page_content', $id) . '</div>';
		echo '<div class="sect section-medium">' . get_field('page_subcontent', $id);


		echo '<div class="pixel-liner">';

		if (get_field('page_btn_text', $id) != 'no')
		{
			echo '<a class="tealBoxBtn" href="' . esc_url( get_field('page_btn_link', $id) );
			echo '" target="_blank">' . get_field('page_btn_text', $id) . '</a>';
		}
		else
		{
			echo '&nbsp;';
		}

		echo '</div></div>';


		if (get_field('sponsors_on', $id))
		{
			echo '<div class="sect section-light noBotSpacing">';
			echo '<div class="h3-wrapper"><h3><span class="thin">2015</span> SPONSORS</h3></div><div class="sponsor-container">';

			$sponsorID = get_page_by_title('Sponsors') -> ID;
			$homeID = get_page_by_title('Home') -> ID;
			$sponsor_object = get_field('sponsor_item', $homeID);
			$i = 0;

			if ($sponsor_object)
			{
				foreach($sponsor_object as $post)
				{
					setup_postdata($post);

					echo '<a class="sponsor" data-role="ajax" href="';
					echo esc_url( get_permalink($sponsorID) ) . '#sponsor';
					echo $i . '"><img src="';
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
