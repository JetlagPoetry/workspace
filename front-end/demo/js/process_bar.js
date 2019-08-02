/* modelProgress=50;
show_processbar(modelProgress);
setTimeout(function(){
    modelProgress=80;
    show_processbar(modelProgress);//1���ִ��
},5000); */
function show_processbar(modelProgress, myChart) {
	let positionLeft = 1,
		max = 100 + 2 * positionLeft,
		value = modelProgress; //������

	var option = {
		backgroundColor: 'white', //����������symbal��ɫһ��
		"xAxis": {
			type: 'value',
			"max": max,
			"splitLine": {
				"show": false
			},
			"axisLine": {
				"show": false
			},
			"axisLabel": {
				"show": false
			},
			"axisTick": {
				"show": false
			}
		},
		"yAxis": {
			"type": "category",
			"inverse": false,
			"data": [],
			"axisLine": {
				"show": false
			},
			"axisTick": {
				"show": false
			},
			"axisLabel": {
				"show": false
			}
		},
		"series": [

			{ //���
				type: 'bar',
				barWidth: 40,
				stack: 'b',
				legendHoverLink: false,
				itemStyle: {
					normal: {
						color: 'rgba(0,0,0,0)'
					}
				},

				data: [positionLeft]
			},


			{ //��
				type: 'bar',
				barWidth: 40,
				stack: 'b',
				label: {
					normal: {
						show: true,
						position: 'right',
						textStyle: {
							color: '#00FFFF'
						},
						formatter: function(e) {
							return (e.value / (max - 2 * positionLeft) * 100).toFixed(2) + "%"
						}
					}
				},
				legendHoverLink: false,
				silent: true,
				itemStyle: {
					normal: {
						barBorderRadius: 30,
						color: new echarts.graphic.LinearGradient(
							0, 0, 1, 0, [{
									offset: 0,
									color: '#74c6ea'
								},
								{
									offset: 1,
									color: '#96ead2'
								}
							]
						)
					}
				},

				data: [value]
			},
			{ //��
				type: 'bar',
				barWidth: 50,
				barGap: '-110%',
				label: {
					normal: {
						show: false,

						position: 'right',
						textStyle: {
							color: '#000'
						}
					}
				},
				itemStyle: {
					normal: {
						barBorderRadius: 30,
						color: 'rgba(0,0,0,0)', //��ɫ
						borderWidth: 2,
						borderColor: 'grey'
					}
				},
				data: [max],
				z: 1,
			}
		]
	};
	// ʹ�ø�ָ�����������������ʾͼ����
	myChart.setOption(option);
}