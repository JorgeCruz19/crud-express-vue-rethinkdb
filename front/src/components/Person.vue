<template>
  <v-container class="pt-16" style="position: relative;">
    <v-row class="text-center justify-center">
      <h2 class="text-h4 mb-10">Maintenance of People</h2>
    </v-row>
    <div v-if="loading">Cargando...</div>
    <!-- Table to show data -->
    <v-simple-table v-else>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Lastname
            </th>
            <th class="text-left">
              Age
            </th>
            <th class="text-left">
              Gender
            </th>
            <th class="text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in persons"
            :key="item.id"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.age }}</td>
            <td>{{ item.gender }}</td>
            <td>
              <v-row class=" align-center">
                <v-btn @click="fillModalPerson(item.id); id = item.id; dialog = !dialog; showButtonEdit = true; showButtonSave = false;" small color="success" class="mr-2">
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="deletePerson(item.id)" small color="red darken-1" class="white--text">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </v-row>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!-- Message of error, add new person, edit person -->
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Botton to add new person-->
    <v-btn
      fab
      color="teal"
      class="white--text"
      top
      right
      fixed
      @click="dialog = !dialog; showButtonSave = true; showButtonEdit = false; clearForm()"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="500px"
     
    >
      <v-card  class="py-5">
        <v-card-text>
          <v-text-field label="Name" v-model="name"></v-text-field>
          <v-text-field label="Lastname" v-model="lastname"></v-text-field>
          <v-text-field label="Age" v-model="age"></v-text-field>
          <v-select
          :items="genders"
          v-model="gender"
          label="Gender"
          ></v-select>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            v-show="showButtonSave"
            text
            color="primary"
            @click="addPerson"
          >
            Enviar
          </v-btn>
          <v-btn
            v-show="showButtonEdit"
            text
            color="primary"
            @click="updatePerson"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
  import axios from 'axios';
  const baseURL = 'http://localhost:3000/api';

  export default {
    name: 'person',

    data: () => ({
      snackbar: false,
      snackbarColor: '',
      text: '',
      dialog: false,
      persons: [],
      showButtonSave: false,
      showButtonEdit: false,
      loading: true,
      errored: false,
      id: '',
      name: '',
      lastname: '',
      age: '',
      gender: '',
      genders: ['Masculino','Femenino']
    }),
    async created() {
      try {
        const res = await axios.get(`${baseURL}`)
        this.persons = res.data;
      } catch (e) {
        console.log(e);
        this.errored = true;
        this.snackbar = true,
        this.text = 'Sorry, it is not possible to get the information at this time, please try again later'
      }
      finally {this.loading = false;}
    },
    methods: {
      async addPerson(){
        try {
          const data = {
            name: this.name,
            lastname: this.lastname,
            age: this.age,
            gender: this.gender
          }
          await axios.post(`${baseURL}/new`, data);
          this.persons = [...this.persons, data];
          this.snackbar = true;
          this.snackbarColor='success';
          this.text = 'Person successfully added';
          this.dialog = false;
          this.clearForm();
        } catch (e) {
          console.log(e);
          this.snackbar = true;
          this.snackbarColor='error';
          this.text = 'Error to add';
        }
      },
      async deletePerson(id){
       try {
          await axios.delete(`${baseURL}/delete/${id}`);
          const filterPerson = this.persons.filter((person) => {return person.id !== id});
          this.persons = [...filterPerson];
          this.snackbar = true;
          this.snackbarColor='success';
          this.text = 'Person successfully deleted';
       } catch (e) {
          console.log(e);
          this.snackbar = true;
          this.snackbarColor='error';
          this.text = 'Error to delete';
        }
      },
      fillModalPerson(id){
        const filterPerson = this.persons.filter((person) => {return person.id === id});
        
        this.name = filterPerson[0].name
        this.lastname = filterPerson[0].lastname
        this.age = filterPerson[0].age
        this.gender = filterPerson[0].gender
      },
      async updatePerson(){
       try {
         const _id = this.id;  
          const data = {
            name: this.name,
            lastname: this.lastname,
            age: this.age,
            gender: this.gender
          }
          await axios.put(`${baseURL}/update/${_id}`, data);
          /* Update person array*/
          const indexUpdate = this.persons.findIndex((person) => {return person.id === _id});
          let newPerson = [...this.persons];
          newPerson[indexUpdate] = {...newPerson[indexUpdate], 
            name: data.name, 
            lastname: data.lastname,
            age: data.age,
            gender: data.gender
          }
          this.persons = newPerson;
          this.dialog = false;
          this.snackbar = true;
          this.snackbarColor='success';
          this.text = 'Person successfully updated';
          this.clearForm();
       } catch (e) {
          console.log(e);
          this.snackbar = true;
          this.snackbarColor='error';
          this.text = 'Error to update';
        }
      },
      clearForm(){
        this.name = '',
        this.lastname = '',
        this.age = '',
        this.gender = ''
      }
    },
  }
</script>
