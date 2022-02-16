new Vue({
      el: '#app',
      vuetify: new Vuetify(),
      data()
      {
         return {
           chosenFile: null,
           message: String(),
           note: String(),
           alertType: String()
         }
      },
      methods: {
         uploadFile: function() {
            if(this.chosenFile === null) {this.message = 'No file Chosen!'; this.alertType = 'error'; setTimeout(() => { this.message = String() }, 1500); return;}
            this.message = 'Uploading ...';
            var formData = new FormData();
            formData.append('video', this.chosenFile, this.chosenFile.name);
            axios.post('/upload', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then((res) => {
                this.message = res.data.message;
                this.alertType = 'success';
                this.chosenFile = null;
                setTimeout(() => {this.message = String();}, 1500);
            })
            .catch((err) => {
                this.message = 'There was an error!';
                this.alertType = 'error';
                this.chosenFile = null;
            });
         },
         sendNote: function() {
            if(this.note)
            {
               this.message = 'Sending ...';
               var now = new Date();
               axios({ method: 'POST', url: '/notes', data: { note: this.note, time: now.toISOString() } })
                  .then((res) => {
                     this.message = res.data.message;
                     this.alertType = res.data.message.indexOf('Error') === -1 ? 'sucess' : 'error';
                     this.note = String();
                     setTimeout(() => { this.message = String() }, 1500);
                  })
                  .catch((err) => {
                     this.message = "Error: " + err;
                     this.alertType = 'error';
                     this.note = String();
                     setTimeout(() => { this.message = String() }, 1500);
                  });
            }
            else
            {
               this.message = "Error: Note field empty";
               this.alertType = 'error';
               setTimeout(() => { this.message = String() }, 1500);
            }
         }
      },
});
