<template>
	<footer class="footer">
		<p class="footer__gitlab">
			Find an issue with this page?
			<a href="https://github.com/akocero/pelikula/issues" target="_blank"
				>Fix it on GitHub</a
			>
		</p>
		<hr />
		<div class="footer__copyright">
			<p class="mb-1">Copyright © 2021 Pelikula</p>
			<p>
				Created with
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
					<title>file_type_firebase</title>
					<path
						d="M5.8,24.6l.17-.237L13.99,9.149l.017-.161L10.472,2.348a.656.656,0,0,0-1.227.207Z"
						style="fill:#ffc24a"
					></path>
					<path
						d="M5.9,24.42l.128-.25L13.965,9.114,10.439,2.448a.6.6,0,0,0-1.133.206Z"
						style="fill:#ffa712"
					></path>
					<path
						d="M16.584,14.01l2.632-2.7L16.583,6.289a.678.678,0,0,0-1.195,0L13.981,8.971V9.2Z"
						style="fill:#f4bd62"
					></path>
					<path
						d="M16.537,13.9l2.559-2.62L16.537,6.4a.589.589,0,0,0-1.074-.047L14.049,9.082l-.042.139Z"
						style="fill:#ffa50e"
					></path>
					<polygon
						points="5.802 24.601 5.879 24.523 6.158 24.41 16.418 14.188 16.548 13.834 13.989 8.956 5.802 24.601"
						style="fill:#f6820c"
					></polygon>
					<path
						d="M16.912,29.756,26.2,24.577,23.546,8.246A.635.635,0,0,0,22.471,7.9L5.8,24.6l9.233,5.155a1.927,1.927,0,0,0,1.878,0"
						style="fill:#fde068"
					></path>
					<path
						d="M26.115,24.534,23.483,8.326a.557.557,0,0,0-.967-.353L5.9,24.569l9.131,5.1a1.912,1.912,0,0,0,1.863,0Z"
						style="fill:#fcca3f"
					></path>
					<path
						d="M16.912,29.6a1.927,1.927,0,0,1-1.878,0L5.876,24.522,5.8,24.6l9.233,5.155a1.927,1.927,0,0,0,1.878,0L26.2,24.577l-.023-.14Z"
						style="fill:#eeab37"
					></path>
				</svg>
				<img src="@/assets/logo.png" alt="" />
				by Eugene Paul Badato
			</p>
		</div>

		<hr />

		<ul class="footer__links">
			<li>
				<a
					href="https://www.facebook.com/hisoka.morow.904/"
					target="_blank"
					><i v-html="iFb"></i
				></a>
			</li>
			<li>
				<a href="https://github.com/akocero" target="_blank"
					><i v-html="iGitHub"></i
				></a>
			</li>
			<li>
				<a
					href="https://www.linkedin.com/in/eugene-paul-badato-1305751aa/"
					target="_blank"
					><i v-html="iLinkedin"></i
				></a>
			</li>
			<li>
				<a href="https://twitter.com/eugenebadato" target="_blank"
					><i v-html="itwitter"></i
				></a>
			</li>
		</ul>
	</footer>
</template>

<script>
import feather from "feather-icons";
export default {
	computed: {
		iFb: function() {
			return feather.icons["facebook"].toSvg({
				width: 42,
				height: 42,
			});
		},
		iGitHub: function() {
			return feather.icons["github"].toSvg({
				width: 42,
				height: 42,
			});
		},
		iLinkedin: function() {
			return feather.icons["linkedin"].toSvg({
				width: 42,
				height: 42,
			});
		},
		itwitter: function() {
			return feather.icons["twitter"].toSvg({
				width: 42,
				height: 42,
			});
		},
	},
};
</script>

<style></style>
