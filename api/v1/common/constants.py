indicator_types = [{
    "name": "hydrological",
    "id": 1,
    "types": [
        {
            "id": 1,
            "name": "depth",
            "unit": "m",
        },
        {
            "id": 2,
            "name": "transparency",
            "unit": "m",
        },
        {
            "id": 3,
            "name": "waves level",
            "unit": "bal",
        }
    ]
},
    {
        "name": "common hydrochemic",
        "id": 2,
        "types": [
            {
                "id": 4,
                "name": "pH",
                "unit": "",
            },
            {
                "id": 5,
                "name": "O2",
                "unit": "mg/l",
            },
            {
                "id": 6,
                "name": "H2S",
                "unit": "mg/l",
            }
        ]
    },
    {
        "name": "pollution",
        "id": 3,
        "types": [
            {
                "id": 7,
                "name": "oil",
                "unit": "mg/l",
            },
            {
                "id": 8,
                "name": "Pb",
                "unit": "mg/l",
            },
            {
                "id": 9,
                "name": "Hg",
                "unit": "mg/l",
            }
        ]
    },
    {
        "name": "meteo",
        "id": 4,
        "types": [
            {
                "id": 10,
                "name": "temperature",
                "unit": "C",
            },
            {
                "id": 11,
                "name": "Pressure",
                "unit": "Pascals",
            },
            {
                "id": 12,
                "name": "precipitation",
                "unit": "mm",
            }
        ]
    },
]


def get_indicator_type_by_id(indicator_type_id):
    return [
        indicator_type
        for indicator_realm in indicator_types
        for indicator_type in indicator_realm['types']
        if str(indicator_type['id']) == str(indicator_type_id)
    ][0]


# indicator_realms = {
#     "hydrological": [],
#     "common hydrochemics": [],
#     "pollution": [],
#     "meteo": []
# }
