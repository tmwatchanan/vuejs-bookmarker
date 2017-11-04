<template>
    <div class="header clearfix">
<nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Bookmarker</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <router-link to="/addbookmark" tag="li" active-class="active" exact><a>Bookmarks</a></router-link>
              <router-link to="/about" tag="li" active-class="active" exact><a>About</a></router-link>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <router-link to="/profile" tag="li" active-class="active" exact><a>Profile</a></router-link>
              <router-link to="/signup" tag="li" active-class="active" exact><a>Sign Up</a></router-link>
            </ul>
          </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
      </nav>
    </div>
</template>

<script>
  export default {

  }

</script>
