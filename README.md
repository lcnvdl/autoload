#autoload

Autoload loads HTML elements on demand.

## Quick Start

### First step
Include autoload.js

```
<script src="lib/autoload.js"></script>
```

### Second stepe

You have two options:

HTML:

```
<!DOCTYPE html>
<html>
<head>

    <!-- Some styles for the example -->
    <link href='http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.min.css' rel='stylesheet'/>
    <link href='http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/css/bootstrap.css' rel='stylesheet'/>
    <link href='http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/css/bootstrap-theme.min.css' rel='stylesheet'/>
    
</head>
<body>

    <button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
        Show modal
    </button>

    <div id="myModal" class='modal fade'>
        <div class='modal-dialog'>
            <div class="modal-content">
            
                <div class='modal-header'>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Example!</h4>
                </div>
                
                <!-- Autoloads the modal body when show -->
                <div class="modal-body"
                    data-load="/modals/body.html"
                    data-events='"show"'
                >
                    <i class='fa fa-2x fa-spin fa-spinner'></i>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
                
            </div>
        </div>
    </div>
    
    <!-- Required scripts -->
    <script src='https://code.jquery.com/jquery-2.1.0.min.js'></script>
    <script src='https://raw.githubusercontent.com/lcnvdl/autoload/master/lib/autoload.js'></script>
    
    <!-- For the example -->
    <script src='http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/js/bootstrap.min.js'></script>
    
    
</body>
</html>
```