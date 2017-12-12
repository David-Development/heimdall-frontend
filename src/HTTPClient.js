
class HTTPClient {

  static handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }

  static getServerHost() {
    //return "//localhost:5003";
    return "//localhost:5000";
  }


  // endpoint = "/api/person"
  static getApiEndpoint(endpoint) {
    return this.getServerHost() + endpoint;
  }



  static fetchPersonImages(personId) {
    let personImagesEndpoint = this.getApiEndpoint(`/person/${personId}/`)
    return fetch(personImagesEndpoint)
      .then(HTTPClient.handleErrors)
      .then(result => result.json());
  }

  static fetchPersons() {
    let personsEndpoint = this.getApiEndpoint("/persons/");
    return fetch(personsEndpoint)
      .then(HTTPClient.handleErrors)
      .then(result => result.json());
  }
  
  static fetchEvents() {
    let eventEndpoint = this.getApiEndpoint("/events/");
    return fetch(eventEndpoint)
      .then(HTTPClient.handleErrors)
      .then(result => result.json());
  }

  static fetchEvent(eventid) {
    let eventEndpoint = this.getApiEndpoint("/events/");
    return fetch(eventEndpoint)
      .then(HTTPClient.handleErrors)
      .then(result => result.json())
      .then(res => res.find(event => event.id === eventid));

      /*
    let eventEndpoint = this.getApiEndpoint(`/events/${eventid}`);
    return fetch(eventEndpoint)
      .then(result => result.json());
      */
  }

  static fetchModels() {
    let modelsEndpoint = this.getApiEndpoint("/models");
    return fetch(modelsEndpoint)
      .then(HTTPClient.handleErrors)
      .then(result => result.json());

      /*
    let eventEndpoint = this.getApiEndpoint(`/events/${eventid}`);
    return fetch(eventEndpoint)
      .then(result => result.json());
      */
  }


  static updateClassification(event) {
    //console.log(event);

    return fetch(this.getApiEndpoint(`/events/${event.id}`),
      {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(event)
      })
      .then(HTTPClient.handleErrors)
      .then(res => res.json())
  }

  static createNewPerson(name) {
    return fetch(this.getApiEndpoint(`/person/`),
      {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: name })
      })
      .then(HTTPClient.handleErrors)
      .then(function(res){ return res.json(); })
      .then(function(data){alert(JSON.stringify(data))})
  }


  static getImageUrl(url) {
    let fullUrl = this.getServerHost() + "/" + url;
    console.log(fullUrl);
    return fullUrl;
  }
}

export default HTTPClient;
