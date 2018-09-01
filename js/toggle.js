donut()
triangles()

$('#donut').click(function () {
	$('#myCarousel').css('display', 'inline-block')
	$('#donut').css('display', 'none')
})

$('.closeTriangle').click(function () {
	$('#myCarousel').css('display', 'none')
	$('#donut').css('display', 'inline-block')
})