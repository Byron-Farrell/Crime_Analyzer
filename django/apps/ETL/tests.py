from django.test import TestCase
from apps.ETL.Validator import Validator

class TestingValidations(TestCase):

    def test_valid_coords(self):
        validator = Validator()

        # Valid coordinates for chicago
        longitude = -87.6298
        latitude = 41.8781

        true_result = validator.validate_coords(longitude, latitude)

        self.assertEqual(true_result, True)

    def test_invalid_coords(self):
        validator = Validator()

        # Invalid coords
        longitude = 'longitude'
        latitude = 'latitude'

        false_result = validator.validate_coords(longitude, latitude)

        self.assertEqual(false_result, False)

    def test_valid_crime_type(self):
        validator = Validator()
        true_result = validator.validate_crime_type('THEFT')
        self.assertEqual(true_result, False)

    def test_invalid_crime_type(self):
        validator = Validator()
        false_result = validator.validate_crime_type('jumping')
        self.assertEqual(false_result, False)
