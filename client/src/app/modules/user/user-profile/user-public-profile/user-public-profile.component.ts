import { Component, OnInit, Renderer2 } from '@angular/core'
import { SnackBarService } from '@core/services/snack-bar.service'
import { MessageType } from '@shared/enum'
import { PictureHelper } from '@shared/helper'
import { UploadHelper } from '@shared/helper/upload-helper'
import { StatesService } from '@core/services/states.service'
import { Storage } from '@shared/storage'
import { UserPublicProfileService } from './user-public-profile.service'

@Component({
    selector: 'app-user-public-profile',
    templateUrl: './user-public-profile.component.html',
    styleUrls: ['./user-public-profile.component.scss']
})
export class UserPublicProfileComponent implements OnInit {

    imgSrc = 'http://localhost:3000/api/picture/get/e9494ab0-7d7b-4c95-9858-b80e78304f1a'
    gravatar = Storage.nickname.substring(0, 1).toUpperCase()

    constructor(
        private renderer: Renderer2,
        private snackBar: SnackBarService,
        public states: StatesService,
        public userPublicProfile: UserPublicProfileService) {
    }

    ngOnInit(): void {
    }

    updateProfileClick() {
        this.snackBar.show('Test message', MessageType.Info)
    }

    clearPictureCommand() {
        // this.imgSrc = undefined
    }

    uploadPictureCommand() {
        this.snackBar.dismiss()
        UploadHelper.uploadFileClick(this.renderer)
            .then(files => UploadHelper.uploadFileReader(files[0]))
            .then(file => PictureHelper.resizePicture(file, 40, 40))
            .then(pictureModel => this.userPublicProfile.pictureAdd(pictureModel).subscribe())
            // .then(picture => this.imgSrc = picture.content)
            .catch(error => {
                this.snackBar.show(error.message, MessageType.Error)
            })
    }

}
