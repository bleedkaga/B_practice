<template>
  <transition name="msgbox-fade">
    <div class="el-message-box__wrapper"
          tabindex="1"
          v-show="visible"
          @click.self="handleWrapperClick"
          role="dialog"
          aria-modal="true"
          :aria-label="title || 'dialog'" >

      <div class="el-message-box" :class="[customClass, center && 'el-message--center']">
        <div class="el-message-box__header" v-if="title !== undefined">
          <div class="el-message-box__title">
            <div class="el-message-box__status" :class="[typeClass]" v-if="typeClass && center"></div>
            <span>{{ title }}</span>
          </div>
          <button type="button" class="el-message-box__headerbtn"
                  aria-label="Close"
                  v-if="showClose"
                  @click="handleAction('cancel')"
                  @keydown.enter="handleAction('cancel')">
            <i class="el-message-box__close el-icon-close"></i>
          </button>
        </div>

        <div class="el-message-box__content" v-if="message !== ''">
          <div class="el-message-box__status" :class="[typeClass]" v-if="typeClass && !center"></div>
          <div class="el-message-box__message">
            <slot>
              <p v-if="!dangerouslyUseHtmlString"> {{message}}</p>
              <p v-else v-html="message"></p>
            </slot>
          </div>
          <div class="el-message-box__input" v-show="showInput">
            <el-input
              v-model="inputValue"
              :type="inputType"
              @compositionstart.native="handleComposition"
              @compositionupdate.native="handleComposition"
              @compositionend.native="handleComposition"
              @keyup.enter.native = "handleKeyup"
              :placeholder="inputPlaceholder"
              ref="input"
            ></el-input>
            <div class="el-message-box__errormsg" :style="{visibility: !!editorErrorMessage ? 'visible' : 'hidden'}">
              {{editorErrorMessage}}
            </div>
          </div>

          <div class="el-message-box__btns">
            <el-button :loading="cancelButtonLoading"
                        :class="[cancelButtonClasses]"
                        v-show="showCancelButton"
                        :round="roundButton"
                        size="small"
                        @click.native="handleAction('cancel')"
                        @keydown.enter="handleAction('cancel')"
            >
              {{cancelButtonText || t('el.messagebox.cancel')}}
            </el-button>
            <el-button
              :loading="confirmButtonLoading"
              ref="confirm"
              :class="[ confirmButtonClasses ]"
              v-show="showConfirmButton"
              :round="roundButton"
              size="small"
              @click.native="handleAction('confirm')"
              @keydown.enter="handleAction('confirm')"
            >
              {{ confirmButtonText || t('el.messagebox.confirm') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Popup from 'vue-elem/src/util/popup'
</script>
