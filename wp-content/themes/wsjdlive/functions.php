<?php 

  function wsjdlive_scripts()
  {
    // Register the script like this for a theme:
    wp_enqueue_script( 'jquery', get_template_directory_uri() . '/scripts/vendor/jquery-1.10.1.min.js' );
    wp_enqueue_script( 'jqueryEase', get_template_directory_uri() . '/scripts/vendor/jquery.easing.1.3.js' );

    wp_enqueue_script( 'metaQuery', get_template_directory_uri() . '/scripts/vendor/metaquery.min-min.js' );
    wp_enqueue_script( 'modernizer', get_template_directory_uri() . '/scripts/vendor/modernizr-2.8.3.min.js' );

    wp_enqueue_script( 'slick', get_template_directory_uri() . '/scripts/vendor/slick.min.js' );
    wp_enqueue_script( 'google-map', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCC30xp7rEhylwdfz_kalnsoSqmwhQw_O0' );

    wp_enqueue_script( 'wsjdlive-controller', get_template_directory_uri() . '/scripts/WSJDLIVE.controller.js' );
    wp_enqueue_script( 'wsjdlive-main', get_template_directory_uri() . '/scripts/WSJDLIVE.main.js' );
    wp_enqueue_script( 'wsjdlive-nav', get_template_directory_uri() . '/scripts/WSJDLIVE.main.nav.js' );
    wp_enqueue_script( 'wsjdlive-landing', get_template_directory_uri() . '/scripts/WSJDLIVE.main.landing.js' );

  }
  add_action( 'wp_enqueue_scripts', 'wsjdlive_scripts' );
?>