<template>
	<div class="spin"></div>
</template>

<style>
.spin {
	display: block;
	width: 32px;
	height: 32px;
	margin: 30px auto;
	border: 4px solid rgb(218, 218, 218);
	border-radius: 50%;
	border-top-color: #333333;
	animation: spin 1.1s ease infinite;
}
@keyframes spin {
	to {
		-webkit-transform: rotateZ(360deg);
	}
}
</style>
