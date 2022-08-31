import { Component, OnInit, Renderer2 } from '@angular/core'
import { SnackBarService } from '@core/services/snack-bar.service'
import { StatesService } from '@core/services/states.service'
import { MessageType } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { PictureHelper } from '@shared/helper'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { map } from 'rxjs'
import { UserPublicProfileModel } from './user-public-profile-model'
import { UserPublicProfileService } from './user-public-profile.service'

@Component({
    selector: 'app-user-public-profile',
    templateUrl: './user-public-profile.component.html',
    styleUrls: ['./user-public-profile.component.scss']
})
export class UserPublicProfileComponent extends ProcessForm implements OnInit {

    imgSrc = 'http://localhost:3000/api/picture/get/e9494ab0-7d7b-4c95-9858-b80e78304f1a'
    gravatar = SlStorage.nickname.substring(0, 1).toUpperCase()
    FieldValidators = FieldValidators
    userPublicProfileModel = new UserPublicProfileModel()

    constructor(
        private renderer: Renderer2,
        private snackBar: SnackBarService,
        private states: StatesService,
        private userPublicProfile: UserPublicProfileService) {
        super()
    }

    ngOnInit(): void {
        this.loadData()
    }

    loadData() {
        this.execute(
            this.userPublicProfile.getUserProfile()
                .pipe(
                    map((data) => this.userPublicProfileModel.formGroup.patchValue(data))
                )
        )
    }

    updateProfileClick() {
        this.snackBar.show('Test message', MessageType.Info)
    }

    clearPictureCommand() {
        // this.imgSrc = undefined
    }

    uploadPictureCommand() {
        this.snackBar.dismiss()
        this.imgSrc = PictureHelper.createImageFromLetter('S', 56, 56)
        // UploadHelper.uploadFileClick(this.renderer)
        //     .then(files => UploadHelper.uploadFileReader(files[0]))
        //     .then(file => PictureHelper.resizePicture(file, 128, 128))
        //     .then(pictureModel => this.userPublicProfile.pictureAdd(pictureModel).subscribe())
        //     // .then(picture => this.imgSrc = picture.content)
        //     .catch(error => {
        //         this.snackBar.show(error.message, MessageType.Error)
        //     })
    }

}
