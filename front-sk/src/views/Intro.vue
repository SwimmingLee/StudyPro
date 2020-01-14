<template>
    <section class="section-hero section-shaped my-0">
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
                    <div class="col-lg-7 text-center pt-lg">
                        <img src="img/brand/logo.png" style="width: 200px;" class="img-fluid">
                        <p class="lead text-white mt-4 mb-5">온라인으로 끝까지 공부하는 가장 확실한 방법!<br>스터디프로</p>
                        <div class="btn-wrapper">
                          <router-link to="/main">
                            <base-button
                                         class="mb-3 mb-sm-0"
                                         type="info"
                                         icon="fa fa-sign-in">
                                Enter
                            </base-button>
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
