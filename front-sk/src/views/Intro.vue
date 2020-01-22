<template>
    <section>
        <div>
            <div>
                <div>
                    <div>
                        <br><br>
                        <img src="@/assets/images/logo_brown.png" style="width: 500px;" class="img-fluid">
                        <p>
                        온라인으로 끝까지 공부하는 가장 확실한 방법!<br>스터디 프로</p>
                        <div>
                            <router-link to="/mypage">
                                <button id="btn" type="submit"><img class="btn-img" src="@/assets/images/enterbutton.png" style="width:300px"></button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
  name: "intro"
};
</script>
