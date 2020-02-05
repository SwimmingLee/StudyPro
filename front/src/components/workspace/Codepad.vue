<template>
  <v-card
    id="notepad_card"
    class="notepad_card"
    ref="board"
    oncontextmenu="return false"
    ondragstart="return false"
    onselectstart="return false"
    maxHeight="640"
    maxWidth="640"
  >
    <div id="firepad-container"></div>
  </v-card>
</template>

<!-- Firebase -->
<script src="https://www.gstatic.com/firebasejs/7.6.2/firebase.js"></script>
<!-- CodeMirror -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.51.0/codemirror.js"></script>
<!-- Firepad -->
<script src="https://cdn.firebase.com/libs/firepad/1.2.0/firepad.min.js"></script>


<script>
export default {
  data() {
    return {};
  },
  props: ["socket", "study_id"],

  methods: {
    init() {
      //// Initialize Firebase.
      //// TODO: replace with your Firebase project configuration.
      let config = {
        apiKey: "AIzaSyDnygAqF2W5nl956P1iCskUqOQFi6GkP8Y",
        authDomain: "my-firepad-61bea.firebaseapp.com",
        databaseURL: "https://my-firepad-61bea.firebaseio.com"
      };

      firebase.initializeApp(config);

      //// Get Firebase Database reference.
      let firepadRef = this.getExampleRef();

      //// Create CodeMirror (with lineWrapping on).
      let codeMirror = CodeMirror(
        document.getElementById("firepad-container"),
        { lineWrapping: true }
      );  
      
      let editorWrapper = codeMirror.getWrapperElement();

      //// Create Firepad (with rich text toolbar and shortcuts enabled).
      let firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
        richTextToolbar: true,
        richTextShortcuts: true
      });

    },
    getExampleRef() {
      let ref = firebase.database().ref();
      ref = ref.child(this.study_id);
      return ref;
    }
  },
  mounted() {
    this.init();
  },
  created() {
  }
};
</script>

<style scoped>
#firepad-container {
  width: 640px;
  height: 640px;
}


</style>
