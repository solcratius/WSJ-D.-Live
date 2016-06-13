<?php
/**
 * The Header template for the WSJDLIVE
 *
 * Displays all of the <head> section and everything up till <div id="content">.
 *
 * @package WSJDLIVE
 */
?>
<!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) & !(IE 8)]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <!-- <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width">

  <meta name="breakpoint" content="phone" media="(max-width: 479px)">
  <meta name="breakpoint" content="small-tablet" media="(min-width: 480px) and (max-width: 639px)">
  <meta name="breakpoint" content="tablet" media="(min-width: 640px) and (max-width: 1023px)">
  <meta name="breakpoint" content="desktop" media="(min-width: 1024px)">
  <meta name="breakpoint" content="widescreen" media="(min-width: 1280px)">
  <meta name="breakpoint" content="retina" media="only screen and (-webkit-min-device-pixel-ratio : 2)">

  <meta property="og:url" content="http://wsjdlive.wsj.com/">
  <meta property="og:site_name" content="WSJDLive">
  <meta property="og:locale" content="en_US">
  <meta property="og:type" content="website">
  <meta property="og:title" content="WSJDLive on October 19-21, 2015 in Laguna Beach">
  <meta property="og:description" content="Tech&rsquo;s Top Leaders Come Together at WSJDLive on October 19-21, 2015 in Laguna Beach">
  <?php echo '<meta property="og:image" content="' . get_field('social_image_path', get_page_by_title( 'Home' )->ID) . 'WSJD-Live-Social-Facebook.jpg">'; ?>
  <meta name="twitter:title" content="">
  <meta name="twitter:description" content="">
  <meta name="twitter:image" content="">
  <?php echo '<meta name="twitter:image:src" content="' . get_field('social_image_path', get_page_by_title( 'Home' )->ID) . 'WSJD-Live-Social-Twitter.jpg">'; ?>
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@WSJ">
  <meta name="twitter:domain" content="http://wsjdlive.wsj.com/">

  <title>WSJ.D LIVE <?php wp_title( ' - ', true, 'left' ); ?></title>
  <link rel="profile" href="#">
  <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

  <link rel="stylesheet" href="http://fonts.wsj.net/HCo_Whitney/font_HCo_Whitney.css">
  <!-- <link rel="stylesheet" href="http://fonts.wsj.net/HCo_Chronicle/font_HCo_Chronicle.css"> -->
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/reset.css" type="text/css">
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/style.css" type="text/css">
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/scripts/vendor/slick.css" type="text/css">
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/scripts/vendor/slick-theme.css" type="text/css">

  <!--[if lt IE 9]>
  <script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
  <![endif]-->
  <?php wp_head(); ?>
</head>

<body id="top" <?php body_class(); ?>>
  <div id="media-wrapper">
    <div class="bgbox">
      <?php

        $pages = get_posts(array(
          'numberposts' => -1,
          'post_type' => 'page',
          'orderby' => 'menu_order',
          'order' => 'ASC',
          'post_parent' => 0
        ));

        $photos = get_posts(array(
          'numberposts' => -1,
          'post_type' => 'post',
          'category_name' => 'Photos',
          'order' => 'DESC',
          'post_parent' => 0
        ));


        if ($pages && $photos)
        {
          $tPage = count($pages);
          $i = 0;

          while($i < $tPage) {
            $bgImg = get_field('bg_img', $pages[$i]->ID);

            if($bgImg) echo '<img src="' . $bgImg . '" />';
            else echo '<img src="' . get_template_directory_uri() . '/images/bg-home.jpg" />';
            $i ++;
          }

          echo '</div><div id="map-canvas" class="mapbox"></div><div class="photobox">';

          $tPhoto = count($photos);
          while($tPhoto) echo '<span class="data">' . get_field('full_image', $photos[--$tPhoto]->ID) . '</span>';
          // while($tPhoto) echo '<li><img src="' . get_field('full_image', $photos[--$tPhoto]->ID) . '" /></li>';

          echo '<ul></ul></div><a href="#" class="photoNavBtn left">prev</a><a href="#" class="photoNavBtn right">next</a>';
          echo '<div class="videobox"></div><a href="#" class="closeBtn">close</a>';

          echo '<div class="registerbox"><h2><a href="';
          echo esc_url( home_url( '/' ) ) . '" data-role="ajax" class="logo-title">' . get_field('event_name', $pages[0]->ID) . '</a></h2><hr>';
          echo '<p class="date">' . get_field('event_date', $pages[0]->ID) . '</p><hr class="date-rule">';
          echo '<p class="location">' . get_field('event_venue', $pages[0]->ID) . '<br><span class="location-detail">';
          echo get_field('event_location', $pages[0]->ID) . '</span></p><hr class="desktop">';
          echo '<a class="tealBoxBtn registerBtn" href="' . get_field('registration_link', $pages[0]->ID) . '">';
          echo get_field('registration_btn_text', $pages[0]->ID) . '</a><hr>';
          echo '<div class="social-share" data-url="http://wsjdlive.wsj.com/" data-text="Tech&rsquo;s Top Leaders Come Together at WSJDLive on October 19-21, 2015 in Laguna Beach" data-title="WSJDLive on October 19-21, 2015 in Laguna Beach">';
          echo '<a class="social facebook" id="facebook" href="">Facebook</a><a class="social twitter" id="twitter" href="">Twitter</a>';
          echo '</div></div></div>';

          echo '<div id="main-wrapper" style="display: none;"><div id="header"><div class="masthead wrapper">';
          echo '<h1><a href="' . esc_url( home_url( '/' ) ) . '" title="' . esc_attr( get_bloginfo( 'name', 'display' ) ) . '" rel="home">';
          echo get_bloginfo( 'name', 'display' ) . '</a></h1>';
          echo '<a class="button" href="' . get_field('registration_link', $pages[0]->ID) . '">';
          echo get_field('registration_btn_text', $pages[0]->ID) . '</a>';
          echo '<a id="back-to-top" class="anchor" href="#top">Back to top</a>';
          echo '<a class="mobile" id="nav-toggle" href="#">Menu</a></div>';

          echo '<nav class="navigation wrapper"><ul>';

          $j = 0;

          while($j < $tPage) {
            $title = strtoupper(get_the_title( $pages[$j]->ID ));
            echo '<li><a class="main-nav" href="' . esc_url( get_permalink($pages[$j]->ID) ) . '" data-role="ajax">' . $title . '</a></li>';
            $j ++;
          }

          echo '<li class="btn-login"><a href="' . get_field('attendee_login_link', $pages[0]->ID) . '">ATTENDEE LOGIN</a></li>';
          echo '<li class="phone"><a href="' . get_field('registration_link', $pages[0]->ID) . '">';
          echo get_field('registration_btn_text', $pages[0]->ID) . '</a></li>';

          echo '</ul><div class="social-share mobile-share sharrre" data-url="http://wsjdlive.wsj.com/" data-text="Tech&rsquo;s Top Leaders Come Together at WSJDLive on October 19-21, 2015 in Laguna Beach" data-title="WSJDLive on October 19-21, 2015 in Laguna Beach">';
          echo '<a class="social facebook" id="facebook" href="">Facebook</a><a class="social twitter" id="twitter" href="">Twitter</a>';
          echo '</div></nav></div>';
        }

      ?>

    <div id="content">
      <div class="body-content">
