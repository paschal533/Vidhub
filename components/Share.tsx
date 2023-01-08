import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  MailruShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  MailruIcon,
  EmailIcon,
} from "react-share";

function Share({ isOpen, onClose, url, name, image } : any) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share via social media</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex w-full space-x-1 flex-wrap justify-center items-center">
              <TwitterShareButton url={url} title={name}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>

              <TelegramShareButton url={url} title={name}>
                <TelegramIcon size={40} round />
              </TelegramShareButton>

              <WhatsappShareButton url={url} title={name} separator=":: ">
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>

              <FacebookShareButton url={url} quote={name}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>

              <LinkedinShareButton url={url} title={name}>
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>

              <RedditShareButton
                url={url}
                title={name}
                windowWidth={660}
                windowHeight={460}
              >
                <RedditIcon size={40} round />
              </RedditShareButton>

              <MailruShareButton url={url} title={name}>
                <MailruIcon size={40} round />
              </MailruShareButton>

              <EmailShareButton url={url} subject={name} body="body">
                <EmailIcon size={40} round />
              </EmailShareButton>

              <PinterestShareButton url={url} media={image}>
                <PinterestIcon size={40} round />
              </PinterestShareButton>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Share;
