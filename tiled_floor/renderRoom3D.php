<?php

/**
 * Plugin Name: Lát sàn 3D
 * Description: Lát sàn gạch men 3D
 * Version: 1.0
 * Author: Marble
 */

if (!defined('ABSPATH')) {
    exit; // Chặn truy cập trực tiếp
}

// Tạo shortcode để nhúng dự án
function tiles_house_render_viewer()
{
    ob_start();
    include plugin_dir_path(__FILE__) . 'index.html';
    return ob_get_clean();
}
add_shortcode('tiles_house', 'tiles_house_render_viewer');

// Thêm CSS & JS
function my_custom_plugin_assets()
{
    wp_enqueue_style('my-custom-style', plugin_dir_url(__FILE__) . 'style.css');
    wp_enqueue_script('my-custom-script', plugin_dir_url(__FILE__) . 'playcanvas-stable.min.js', array(), false, true);
    wp_enqueue_script('my-custom-script', plugin_dir_url(__FILE__) . '__start__.js', array(), false, true);
    wp_enqueue_script('my-custom-script', plugin_dir_url(__FILE__) . '__settings__.js', array(), false, true);
    wp_enqueue_script('my-custom-script', plugin_dir_url(__FILE__) . '__loading__.js', array(), false, true);
    wp_enqueue_script('my-custom-script', plugin_dir_url(__FILE__) . '__modules__.js', array(), false, true);
    wp_enqueue_script('my-custom-script', plugin_dir_url(__FILE__) . '__game-scripts.js', array(), false, true);
}
add_action('wp_enqueue_scripts', 'my_custom_plugin_assets');
