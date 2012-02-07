jQuery(document).ready(function($){
	$("#dspp_settings")[0].reset();
    $("#stepscount").bind("keyup paste change", function(){
		var number = parseInt($(this).val());
		var html = "";
		var i;
		var tablesCount = $("[id^=dspp_table_content]").length;
		for(i=number; i<tablesCount; i++)
			$("#dspp_table_content"+(i+1)).remove();
		for(var i=0; i<number; i++)
		{
			html = "";
			if($("#dspp_table_content"+(i+1)).length==0)
			{
				html += "<table class='form-table' id='dspp_table_content" + (i+1) + "''>";
				html += "	<tr valign='top'>";
				html += "		<th scope='row' colspan='2' style='font-weight: bold;'>";
				html += "			Step " + (i+1) + " settings:";
				html += "		</th>";
				html += "	</tr>";
				html += "	<tr valign='top'>";
				html += "		<th scope='row'>";
				html += "			<label for='title" + (i+1) + "''>Title</label>";
				html += "		</th>";
				html += "		<td>";
				html += "			<input type='text' class='regular-text' value='' id='title" + (i+1) + "'' name='step_title[]'>";
				html += "			<span class='description'>Defines the title of the step.</span>";
				html += "		</td>";
				html += "	</tr>";
				html += "	<tr valign='top'>";
				html += "		<th scope='row'>";
				html += "			<label for='tag" + (i+1) + "''>Tag</label>";
				html += "		</th>";
				html += "		<td>";
				html += "			<input type='text' class='regular-text' value='a' id='tag" + (i+1) + "'' name='step_tag[]'>";
				html += "			<span class='description'>Defines the html tag of the step node.</span>";
				html += "		</td>";
				html += "	</tr>";
				html += "	<tr valign='top'>";
				html += "		<th scope='row'>";
				html += "			<label for='href" + (i+1) + "''>Href</label>";
				html += "		</th>";
				html += "		<td>";
				html += "			<input type='text' class='regular-text' value='#content" + (i+1) + "_" + $("#shortcodeId").val() + "'' id='href" + (i+1) + "'' name='step_href[]'>";
				html += "			<span class='description'>Defines the href attribute of the step.</span>";
				html += "		</td>";
				html += "	</tr>";
				html += "	<tr valign='top'>";
				html += "		<th scope='row'>";
				html += "			<label for='class" + (i+1) + "''>Class</label>";
				html += "		</th>";
				html += "		<td>";
				html += "			<input type='text' class='regular-text' value='' id='class" + (i+1) + "'' name='step_class[]'>";
				html += "			<span class='description'>Defines the class attribute of the step.</span>";
				html += "		</td>";
				html += "	</tr>";
				html += "	<tr valign='top'>";
				html += "		<th scope='row'>";
				html += "			<label for='label" + (i+1) + "''>Label</label>";
				html += "		</th>";
				html += "		<td>";
				html += "			<input type='text' class='regular-text' value='' id='label" + (i+1) + "'' name='step_label[]'>";
				html += "			<span class='description'>Defines the label attribute of the step.</span>";
				html += "		</td>";
				html += "	</tr>";
				html += "	<tr valign='top'>";
				html += "		<th scope='row'>";
				html += "			<label for='content" + (i+1) + "'>Content</label>";
				html += "		</th>";
				html += "		<td>";
				html += "			<textarea cols='50' rows='10' id='content" + (i+1) + "'' class='large-text code' name='step_content[]'></textarea>";
				html += "			<span class='description'>HTML step content.</span>";
				html += "		</td>";
				html += "	</tr>";
				html += "	<tr valign='top'>";
				html += "		<th scope='row'>";
				html += "			<label for='contentfromfile" + (i+1) + "'>Content from file</label>";
				html += "		</th>";
				html += "		<td>";
				html += "			<input type='text' class='regular-text' value='' id='contentfromfile" + (i+1) + "' name='step_content_from_file[]' />";
				html += "			<span class='description'>Specify the file from which content will be loaded via AJAX. If you specify this parameter, html step content will be ignored.</span>";
				html += "		</td>";
				html += "	</tr>";
				html += "	<tr valign='top'>";
				html += "		<th scope='row'>";
				html += "			<label for='content_tag" + (i+1) + "''>Content tag</label>";
				html += "		</th>";
				html += "		<td>";
				html += "			<input type='text' class='regular-text' value='div' id='content_tag" + (i+1) + "'' name='step_content_tag[]'>";
				html += "			<span class='description'>Defines the html tag of the step content node.</span>";
				html += "		</td>";
				html += "	</tr>";
				html += "	<tr valign='top'>";
				html += "		<th scope='row'>";
				html += "			<label for='content_id" + (i+1) + "''>Content id</label>";
				html += "		</th>";
				html += "		<td>";
				html += "			<input type='text' class='regular-text' value='content" + (i+1) + "_" + $("#shortcodeId").val() + "'' id='content_id" + (i+1) + "'' name='step_content_id[]'>";
				html += "			<span class='description'>Defines the id attribute of the step content.</span>";
				html += "		</td>";
				html += "	</tr>";
				html += "	<tr valign='top'>";
				html += "		<th scope='row'>";
				html += "			<label for='content_class" + (i+1) + "''>Content class</label>";
				html += "		</th>";
				html += "		<td>";
				html += "			<input type='text' class='regular-text' value='' id='content_class" + (i+1) + "'' name='step_content_class[]'>";
				html += "			<span class='description'>Defines the class attribute of the step content.</span>";
				html += "		</td>";
				html += "	</tr>";
				html += "</table>";
				$("#steps_settings").append(html);
			}
		}
	});
	$("#editShortcodeId").change(function(){
		if($(this).val()!="-1")
		{
			var id = $("#editShortcodeId :selected").html();
			$("#shortcodeId").val(id);
			$("#ajax_loader").css("display", "inline");
			$.ajax({
					url: ajaxurl,
					type: 'post',
					dataType: 'json',
					data: 'action=get_settings&id='+id,
					success: function(json){
						$("#stepscount").val(json.stepscount).trigger("change");
						$.each(json, function(key, val){
							if(key=="title" || key=="tag" || key=="href" || key=="class" || key=="label" || key=="content" || key=="contentfromfile" || key=="contenttag" || key=="contentid" || key=="contentclass")
							{
								for(var i=0; i<json.stepscount; i++)
								{
									if((key=="title" || key=="content") && json[key][i]=="&nbsp;")
										$("#" + key + (i+1)).val("");
									else
										$("#" + key + (i+1)).val(json[key][i]);
								}
							}
							else
								$("#" + key).val(val);
						});
						$("#panelid").trigger("change");
						$("#ajax_loader").css("display", "none");
					}
			});
		}
		else
			$("#dspp_settings")[0].reset();
	});
	$("#aspopup").change(function(){
		if($(this).val()=="yes")
			$("#panelclass").val($("#panelclass").val() + " dspp_popup");
		else
			$("#panelclass").val($("#panelclass").val().replace(" dspp_popup", ""));
		
	});
	$("#shortcodeId").bind("keyup paste change", function(){
		$("#shortcodeId").val($("#shortcodeId").val().replace(" ", "_"));
		$("#panelid").val("processPanel" + "_" + $("#shortcodeId").val()).trigger("change");
		$("[id^=href]").each(function(index){
			$(this).val("#content" + (index+1) + "_" + $("#shortcodeId").val());
		});
		$("[id^=contentid]").each(function(index){
			$(this).val("content" + (index+1) + "_" + $("#shortcodeId").val());
		});
	});
	$("#panelid").bind("keyup paste change", function(){
		$("#panelidhint").html($(this).val());
	});
});
