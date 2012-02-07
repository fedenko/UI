	<div id="map-container" onload="destMap.initialize(<?php echo $lat ?>,<?php echo $lng ?>);">	
				<link rel="stylesheet" href="../css/style.css" type="text/css" media="screen">
				<link rel="stylesheet" href="../css/map.css" type="text/css" media="screen">
				
				<script src="http://maps.google.com/maps/api/js?sensor=true"></script> 
				<script src="http://www.google.com/jsapi"></script> 
				<script src="../js/map.js"></script>
				<div class="article">
						<div id="form">
						<form>
							<table class="iti" border="0" width="696">
								<tbody>
									<tr valign="top">									
										<td align="right" class="1" >
											<label for="start" class="1-1" >Start :</label>
										</td>
										<td  align="left">
											<input  id="start" name="from" class="90" type="text" />
										</td>
										<td class="2 40"  align="right" valign="middle">
											<input class="get" onclick="destMap.initiate_geolocation();" type="button" value="Find my address" />
										</td>									
									</tr>
									<tr>
										<td align="right" class="3" >
											<label for="end">End :</label>
										</td>
										<td align="left">
											<input id="end" name="to" readonly="readonly" class="90" type="text" value="<?php echo $address ?>" />
										</td>
										<td class="4 40" align="right">
											<input class="get" onclick="destMap.route();" type="button" value="Itinerary" />
										</td>
									</tr>
								</tbody>
							</table>
						</form>
							<div id="contentmap">
								<div id="map"></div> 
								<div id="route"></div>
								<div class="clearix"></div>
							</div> 
						</div>
				</div>			
	</div>		