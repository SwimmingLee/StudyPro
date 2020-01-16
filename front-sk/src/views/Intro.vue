<template>
    <section class="section-intro section-shaped my-0">
        <div class="shape shape-style-1 shape-primary">
            <span class="span-150"></span>
            <span class="span-50"></span>
            <span class="span-50"></span>
            <span class="span-75"></span>
            <span class="span-100"></span>
            <span class="span-75"></span>
            <span class="span-50"></span>
            <span class="span-100"></span>
            <span class="span-50"></span>
            <span class="span-100"></span>
        </div>
        <div class="container shape-container align-items-center">
            <div class="col px-0">
                <div class="row justify-content-center align-items-center">
                    <div class="col-lg-10 text-center pt-lg">
                        <br><br>
                        <img src="@/assets/images/logo_brown.png" style="width: 500px;" class="img-fluid">
                        <p style="text-align:left;font-size:250%;color:white"><br>온라인으로 끝까지 공부하는 가장 확실한 방법!<br>스터디 프로</p>
                       <!-- <p class="lead text-white mt-4 mb-5">온라인으로 끝까지 공부하는 가장 확실한 방법!<br>스터디프로</p>-->
                        <div class="btn-wrapper">
                            <router-link to="/main">
                                <button class="btn" id="btn" type="submit"><img class="btn-img" src="@/assets/images/enterbutton.png" style="width:300px"></button>
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
