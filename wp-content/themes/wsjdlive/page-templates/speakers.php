<?php
/**
 * Template Name: Speakers
 *
 * @package WordPress
 * @subpackage WSJDLIVE
 * @since WSJDLIVE 1.0
 */

get_header(); ?>

<?php

	$page = get_page_by_title('Speakers');

	if ($page)
	{
		$id = $page -> ID;

		echo '<div class="sect section-light noBotSpacing">';
		echo '<div class="h3-wrapper"><h3><span class="thin">2015</span> SPEAKERS</h3></div>';
		echo '<div class="speakers-container">';

		$general_speaker_object = get_field('general_speaker_item');

		if ($general_speaker_object)
		{
			foreach($general_speaker_object as $post)
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

		echo '<div class="clearBoth"></div></div></div>';

		echo '<div class="sect section-medium noBotSpacing">';
		echo '<div class="h3-wrapper"><h3><span class="thin">2015</span> ROUNDTABLE<br />DISCUSSION LEADERS</h3></div>';
		echo '<div class="speakers-container">';

		$roundtable_leader_object = get_field('roundtable_leader_item');

		if ($roundtable_leader_object)
		{
			foreach($roundtable_leader_object as $post)
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

		echo '<div class="clearBoth"></div></div></div>';

		echo '<div class="sect section-medium noBotSpacing">';
		echo '<div class="h3-wrapper"><h3><span class="thin">2015</span> SPONSORED ROUNDTABLE<br />DISCUSSION LEADERS</h3></div>';
		echo '<div class="speakers-container">';

		$sponsored_roundtable_leader_object = get_field('sponsored_roundtable_leader_item');

		if ($sponsored_roundtable_leader_object)
		{
			foreach($sponsored_roundtable_leader_object as $post)
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

		echo '<div class="clearBoth"></div></div></div>';

		echo '<div class="sect section-medium noBotSpacing">';
		echo '<div class="h3-wrapper"><h3><span class="thin">2015</span> EDITORIAL HOSTS</h3></div>';
		echo '<div class="speakers-container">';

		$editorial_host_object = get_field('editorial_host_item');

		if ($editorial_host_object)
		{
			foreach($editorial_host_object as $post)
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

		echo '<div class="clearBoth"></div></div></div>';

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
