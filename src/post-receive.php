<?php
ignore_user_abort(true);
set_time_limit(0);

// TODO check against ip or secret hash
if ( $_SERVER['HTTP_X_GITHUB_EVENT'] == 'push' ) {
  shell_exec("sudo /var/www/status-site/deploy.sh");
  echo file_get_contents("/var/www/status-site/build.log");
}
