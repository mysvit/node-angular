import { Component, OnInit, Renderer2 } from '@angular/core'
import { SnackBarService } from '@core/services/snack-bar.service'
import { StatesService } from '@core/services/states.service'
import { MessageType } from '@static/enum'
import { PictureHelper } from '@static/helper'
import { UploadHelper } from '@static/helper/upload-helper'

@Component({
    selector: 'app-user-public-profile',
    templateUrl: './user-public-profile.component.html',
    styleUrls: ['./user-public-profile.component.scss']
})
export class UserPublicProfileComponent implements OnInit {

    imgSrc: any

    constructor(
        private renderer: Renderer2,
        private snackBar: SnackBarService,
        public states: StatesService) {
    }

    ngOnInit(): void {
    }

    updateProfileClick() {
        this.snackBar.show('Test message', MessageType.Info)
    }

    clearPictureCommand() {
        this.imgSrc = undefined
    }

    uploadPictureCommand() {
        UploadHelper.uploadFileClick(this.renderer)
            .then(files => UploadHelper.uploadFileReader(files[0]))
            .then(file => PictureHelper.resizePicture(file, 40, 40))
            .then(picture => this.imgSrc = picture.content)
            .catch(error => {
                this.snackBar.show(error.message, MessageType.Error)
            })
    }

}
