
class HTTPClient {

  static handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }

  static getServerHost() {
    //return "//localhost:5003";
    return `//${window.location.hostname}:5000`;
  }


  // endpoint = "/api/person"
  static getApiEndpoint(endpoint) {
    if(endpoint.startsWith('/')) {
      return this.getServerHost() + endpoint;
    } else {
      return this.getServerHost() + '/' + endpoint;
    }
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
      /*
      .then(res => res.filter(x => {
        return x.name !== 'new' && x.name !== 'unknown'
      }));
      */
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
      .then(res => res.find(event => event.id === eventid))
      .then(event => event ? event : []); // Event or empty by default

      /*
    let eventEndpoint = this.getApiEndpoint(`/events/${eventid}`);
    return fetch(eventEndpoint)
      .then(result => result.json());
      */
  }

  static fetchModels() {
    //let modelsEndpoint = this.getApiEndpoint("/api/models");
    let modelsEndpoint = this.getApiEndpoint("/api/classifier");
    return fetch(modelsEndpoint)
      .then(HTTPClient.handleErrors)
      .then(result => result.json())
      .then(result => result.data ? result.data : undefined);

      /*
    let eventEndpoint = this.getApiEndpoint(`/events/${eventid}`);
    return fetch(eventEndpoint)
      .then(result => result.json());
      */
  }

  static startTraining() {
    let eventEndpoint = this.getApiEndpoint("/api/recognizer/train/");
    return fetch(eventEndpoint)
      .then(HTTPClient.handleErrors)
      .then(result => result.json());
  }

  static checkIfClassifierExists() {
    let eventEndpoint = this.getApiEndpoint("/api/classifier/");
    return fetch(eventEndpoint)
      .then(HTTPClient.handleErrors)
      .then(result => result.json())
      .then(res => res.data.length > 0);
  }



  static updateClassification(event, person_id, image_id) {
    //console.log(event);

    return fetch(this.getApiEndpoint(`/api/images/`),
      {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ 
            gallery_id: person_id,
            image_ids: [ image_id ]
          })
      })
      .then(HTTPClient.handleErrors)
      .then(res => res.json())
  }

  /*
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
  */

  static createNewPerson(name) {
    return fetch(this.getApiEndpoint(`/api/gallery/`),
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
