<?php
/**
 * The Footer template for the WSJDLIVE
 *
 * Displays all of the footer-content section to end tag of html.
 *
 * @package WSJDLIVE
 */
?>
			</div>
			<div class="footer-content">
				<div class="footer-logo">
					<a href="http://www.dowjones.com" target="_blank">Dow Jones | The Wall Street Journal</a>
				</div>
				<div class="footer-copy">
					<p>&copy;Copyright <?php echo date("Y"); ?> <span class="nowrap"><a href="http://www.dowjones.com" target="_blank">Dow Jones &amp; Company</a>, Inc.</span> <span class="nowrap">All Rights Reserved</span><br />
					<a href="http://www.dowjones.com" target="_blank">www.dowjones.com</a> | <a href="http://www.wsj.com/policy/privacy-policy?mod=wsjdlive" target="_blank">Privacy Policy</a></p>
				</div>
				<div class="clearBoth"></div>
			</div>
		</div>
		<div id="speakers-modal">
			<div class="container">
				<div class="h3-wrapper"><h3><span class="thin">2015</span> SPEAKERS</h3></div>
				<img src="<?php echo get_template_directory_uri(); ?>/images/speaker-img.jpg" />
				<h3 class="name">NAME</h3>
				<span class="title">Title</span> <span class="company">Company</span>
				<div class="pixel-liner">&nbsp;</div>
				<p>Description</p>
			</div>
			<a href="#" class="closeBtn dark">close</a>
		</div>
		<div id="video-modal">
			<div class="h3-wrapper"><h3>WSJDLIVE <span class="thin">2015</span></h3></div>
			<div class="container"> </div>
			<a href="#" class="closeBtn dark">close</a>
		</div>
	</div>
</body>
</html>