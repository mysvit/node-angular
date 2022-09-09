import { Component, OnInit, Renderer2 } from '@angular/core'
import { SnackBarService } from '@core/services/snack-bar.service'
import { StatesService } from '@core/services/states.service'
import { PictureModel } from '@dto'
import { MessageType } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { PictureHelper } from '@shared/helper'
import { UploadHelper } from '@shared/helper/upload-helper'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { map } from 'rxjs'
import { UserProfileService } from '../user-profile.service'
import { UserPublicProfileModel } from './user-public-profile-model'
import { UserPublicProfileService } from './user-public-profile.service'

@Component({
    selector: 'app-user-public-profile',
    templateUrl: './user-public-profile.component.html',
    styleUrls: ['./user-public-profile.component.scss']
})
export class UserPublicProfileComponent extends ProcessForm implements OnInit {

    FieldValidators = FieldValidators
    formModel = new UserPublicProfileModel()

    constructor(
        private renderer: Renderer2,
        private snackBar: SnackBarService,
        private states: StatesService,
        private userPublicProfile: UserPublicProfileService,
        private userProfile: UserProfileService
    ) {
        super()
    }

    ngOnInit(): void {
        this.execute(this.loadModel())
    }

    private loadModel() {
        return this.userProfile.getUserProfile()
            .pipe(
                map(data => this.formModel.formGroup.patchValue(data))
            )
    }

    updateProfileClick() {
    }

    generateGravatarCommand() {
        this.snackBar.dismiss()
        const pictureModel = <PictureModel>{
            name: this.formModel.nickname.value.substring(0, 1).toUpperCase(),
            height: 56,
            width: 56,
            ext: 'png'
        }
        pictureModel.contentBase64 = PictureHelper.createImageFromLetter(pictureModel.name, pictureModel.height, pictureModel.width)
        this.formModel.avatarId.setValue('')
        this.execute(
            this.userPublicProfile.updUserProfilePicture(SlStorage.user_id, pictureModel)
                .pipe(
                    map(pictureId => this.updateAvatar(pictureId))
                )
        )
    }

    uploadPictureCommand() {
        this.snackBar.dismiss()
        UploadHelper.uploadFileClick(this.renderer)
            .then(files => UploadHelper.uploadFileReader(files[0]))
            .then(file => PictureHelper.resizePicture(file, 128, 128))
            .then(pictureModel => {
                this.execute(
                    this.userPublicProfile.updUserProfilePicture(SlStorage.user_id, pictureModel)
                        .pipe(
                            map(pictureId => this.updateAvatar(pictureId))
                        )
                )
            })
            .catch(error => this.snackBar.show(error.message, MessageType.Error))
    }

    private updateAvatar(pictureId: string) {
        this.formModel.avatarId.setValue(pictureId)
        SlStorage.avatar_id = pictureId
        this.snackBar.show('Picture profile uploaded successfully', MessageType.Success, 5000)
    }

}
