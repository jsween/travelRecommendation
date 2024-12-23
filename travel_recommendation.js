var xhr = new XMLHttpRequest();
var url = './travel_recommendation_api.json';

xhr.open('GET', url, true);
xhr.responseType = 'json';

xhr.send();