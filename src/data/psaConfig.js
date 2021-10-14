const swccConfigOrig = {
	swcc:{
		sw01:{
			stations: [20207, 20212, 20213],
			thresholds: {ERC: {dry: 45, veryDry: 70}, MinT:{dry: 40, veryDry: 50}},
			parameters: ['ERC', 'MinT'],
			models: ['G', 'Y'],
			fireSeason:{startMonth:5, startDay:1, endMonth:7, endDay:31},
			climoYears:[2002, 2016]
		},
		sw02:{
			stations: [20115,20501,20509],
			thresholds: {ERC: {dry: 65, veryDry: 75}, F100:{dry: 9, veryDry: 6}},
			parameters: ['ERC', 'F100'],
			models: ['G', 'Y'],
			fireSeason:{startMonth:4, startDay:1, endMonth:6, endDay:30},
			climoYears:[2002, 2016]
		},
		sw03:{
			stations: [45801],
			thresholds: {ERC: {dry: 70, veryDry: 90}, FM10:{dry: 6, veryDry: 3}},
			parameters: ['ERC', 'FM10'],
			models: ['G', 'Y'],
			fireSeason:{startMonth:3, startDay:1, endMonth:6, endDay:30},
			climoYears:[2002, 2016]
		},
		sw04:{
			stations: [20402, 290101, 290102],
			thresholds: {ERC: {dry: 50, veryDry: 70}, F100:{dry: 10, veryDry: 7}},
			parameters: ['ERC', 'F100'],
			models: ['G', 'Y'],
			fireSeason:{startMonth:5, startDay:1, endMonth:7, endDay:31},
			climoYears:[2002, 2016]
		},
		sw05:{
			stations: [20209, 20301, 20303],
			thresholds: {ERC: {dry: 55, veryDry: 70}, F100:{dry: 11, veryDry: 7}},
			parameters: ['ERC', 'F100'],
			models: ['G', 'Y'],
			fireSeason:{startMonth:5, startDay:1, endMonth:6, endDay:30},
			climoYears:[2002, 2016]
		},
	}
}

const swccConfig = {
	swcc:{
		"SW01": {
			"stations": [20207, 20212, 20213],
			"thresholds": {
				"ERC": {
					"dry": 45,
					"veryDry": 70
				},
				"MinT": {
					"dry": 40,
					"veryDry": 50
				}
			},
			"parameters": ["ERC", "MinT"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 5,
				"startDay": 1,
				"endMonth": 7,
				"endDay": 31,
			},
			"climoYears": [2002, 2016]
		},
		"SW02": {
			"stations": [20115, 20501, 20509],
			"thresholds": {
				"ERC": {
					"dry": 65,
					"veryDry": 75
				},
				"F100": {
					"dry": 9,
					"veryDry": 6
				}
			},
			"parameters": ["ERC", "F100"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 4,
				"startDay": 1,
				"endMonth": 6,
				"endDay": 30,
			},
			"climoYears": [2002, 2016]
		},
		"SW03": {
			"stations": [45801],
			"thresholds": {
				"ERC": {
					"dry": 70,
					"veryDry": 90
				},
				"FM10": {
					"dry": 6,
					"veryDry": 3
				}
			},
			"parameters": ["ERC", "FM10"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 3,
				"startDay": 1,
				"endMonth": 6,
				"endDay": 30,
			},
			"climoYears": [2002, 2016]
		},
		"SW04": {
			"stations": [20402, 290101, 290102],
			"thresholds": {
				"ERC": {
					"dry": 50,
					"veryDry": 70
				},
				"F100": {
					"dry": 10,
					"veryDry": 7
				}
			},
			"parameters": ["ERC", "F100"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 5,
				"startDay": 1,
				"endMonth": 7,
				"endDay": 31,
			},
			"climoYears": [2002, 2016]
		},
		"SW05": {
			"stations": [20209, 20301, 20303],
			"thresholds": {
				"ERC": {
					"dry": 55,
					"veryDry": 70
				},
				"F100": {
					"dry": 11,
					"veryDry": 7
				}
			},
			"parameters": ["ERC", "F100"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 5,
				"startDay": 1,
				"endMonth": 6,
				"endDay": 30,
			},
			"climoYears": [2002, 2016]
		},
		"SW06N": {
			"stations": [20601, 20604],
			"thresholds": {
				"ERC": {
					"dry": 70,
					"veryDry": 85
				},
				"MinT": {
					"dry": 50,
					"veryDry": 60
				}
			},
			"parameters": ["ERC", "MinT"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 4,
				"startDay": 1,
				"endMonth": 7,
				"endDay": 31,
			},
			"climoYears": [2002, 2016]
		},
		"SW06S": {
			"stations": [21005, 21007, 21202, 21206],
			"thresholds": {
				"ERC": {
					"dry": 55,
					"veryDry": 70
				},
				"F100": {
					"dry": 9,
					"veryDry": 6
				}
			},
			"parameters": ["ERC", "F100"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 4,
				"startDay": 1,
				"endMonth": 6,
				"endDay": 30,
			},
			"climoYears": [2002, 2016]
		},
		"SW07": {
			"stations": [290702, 200801, 291302],
			"thresholds": {
				"ERC": {
					"dry": 50,
					"veryDry": 70
				},
				"F100": {
					"dry": 10,
					"veryDry": 7
				}
			},
			"parameters": ["ERC", "F100"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 5,
				"startDay": 1,
				"endMonth": 7,
				"endDay": 31,
			},
			"climoYears": [2002, 2016]
		},
		"SW08": {
			"stations": [20401, 292001, 292008, 292009],
			"thresholds": {
				"ERC": {
					"dry": 60,
					"veryDry": 80
				},
				"F100": {
					"dry": 10,
					"veryDry": 7
				}
			},
			"parameters": ["ERC", "F100"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 5,
				"startDay": 1,
				"endMonth": 6,
				"endDay": 30,
			},
			"climoYears": [2002, 2016]
		},
		"SW09": {
			"stations": [292103, 292702, 292903],
			"thresholds": {
				"ERC": {
					"dry": 60,
					"veryDry": 80
				},
				"F100": {
					"dry": 9,
					"veryDry": 6
				}
			},
			"parameters": ["ERC", "F100"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 4,
				"startDay": 1,
				"endMonth": 6,
				"endDay": 30,
			},
			"climoYears": [2002, 2016]
		},
		"SW10": {
			"stations": [290210, 291202],
			"thresholds": {
				"ERC": {
					"dry": 50,
					"veryDry": 65
				},
				"F100": {
					"dry": 10,
					"veryDry": 8
				}
			},
			"parameters": ["ERC", "F100"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 5,
				"startDay": 1,
				"endMonth": 7,
				"endDay": 31,
			},
			"climoYears": [2002, 2016]
		},
		"SW11": {
			"stations": [291501, 292102],
			"thresholds": {
				"ERC": {
					"dry": 55,
					"veryDry": 80
				},
				"F100": {
					"dry": 9,
					"veryDry": 6
				}
			},
			"parameters": ["ERC", "F100"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 4,
				"startDay": 1,
				"endMonth": 6,
				"endDay": 30,
			},
			"climoYears": [2002, 2016]
		},
		"SW12": {
			"stations": [292203, 293002, 293003],
			"thresholds": {
				"ERC": {
					"dry": 40,
					"veryDry": 60
				},
				"F100": {
					"dry": 12,
					"veryDry": 8
				}
			},
			"parameters": ["ERC", "F100"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 4,
				"startDay": 1,
				"endMonth": 6,
				"endDay": 30,
			},
			"climoYears": [2002, 2016]
		},
		"SW13": {
			"stations": [418701, 292301],
			"thresholds": {
				"ERC": {
					"dry": 40,
					"veryDry": 55
				},
				"FM10": {
					"dry": 8,
					"veryDry": 6
				}
			},
			"parameters": ["ERC", "FM10"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 2,
				"startDay": 1,
				"endMonth": 6,
				"endDay": 30,
			},
			"climoYears": [2002, 2016]
		},
		"SW14N": {
			"stations": [292301, 293101, 293104],
			"thresholds": {
				"ERC": {
					"dry": 40,
					"veryDry": 55
				},
				"FM10": {
					"dry": 8,
					"veryDry": 5
				}
			},
			"parameters": ["ERC", "FM10"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 2,
				"startDay": 1,
				"endMonth": 6,
				"endDay": 30,
			},
			"climoYears": [2002, 2016]
		},
		"SW14S": {
			"stations": [417201, 417401, 417403],
			"thresholds": {
				"ERC": {
					"dry": 65,
					"veryDry": 80
				},
				"F100": {
					"dry": 9,
					"veryDry": 6
				}
			},
			"parameters": ["ERC", "F100"],
			"models": ["G", "Y"],
			"fireSeason": {
				"startMonth": 2,
				"startDay": 1,
				"endMonth": 6,
				"endDay": 30,
			},
			"climoYears": [2002, 2016]
		}
	}
}

export default swccConfig

