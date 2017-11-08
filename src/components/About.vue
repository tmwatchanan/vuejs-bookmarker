<template>
 <div class="container">
    <div class="span3 well">
        <center>
        <a href="#aboutModal" data-toggle="modal" data-target="#myModal">
            <img :src="'https://avatars0.githubusercontent.com/u/13808339?s=460&v=4'" name="aboutme" width="140" height="140" class="img-circle">
        </a>
        <h3>Watchanan Chantapakul</h3>
        <h4>570610601</h4>
        <h4></h4>
        <em>click my face for more</em>
		</center>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title" id="myModalLabel">More About Watchanan</h4>
                    </div>
                <div class="modal-body">
                    <center>
                    <img :src="'https://avatars0.githubusercontent.com/u/13808339?s=460&v=4'" name="aboutme" width="140" height="140" border="0" class="img-circle"></a>
                    <h3 class="media-heading">Watchanan Chantapakul <small>Thailand</small></h3>
                    <span><strong>Interests: </strong></span>
                        <span class="label label-warning">Life-long Learning</span>
                        <span class="label label-info">Technologies</span>
                        <span class="label label-info">Computer Vision</span>
                        <span class="label label-success">Computational Intelligence</span>
                    </center>
                    <hr>
                    <center>
                    <p class="text-left"><strong>Bio: </strong><br>
                        A computer engineering student at Chiang Mai University.</p>
                    <br>
                    </center>
                </div>
                <div class="modal-footer">
                    <center>
                    <button type="button" class="btn btn-default" data-dismiss="modal">OK</button>
                    </center>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  computed: {
      profileImage() {
        //   return require('../assets/Watchanan-profile.jpg')
      }
  }
}
</script>
