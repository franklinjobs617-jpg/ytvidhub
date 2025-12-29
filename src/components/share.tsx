"use client";
import {
  TwitterShareButton, TwitterIcon,
  RedditShareButton, RedditIcon,
  FacebookShareButton, FacebookIcon,
  WhatsappShareButton, WhatsappIcon,
  TelegramShareButton, TelegramIcon,
} from "react-share";

export default function Share() {
  const shareUrl = "https://ytvidhub.com";
  
  const mainTitle = "🚀 Stop wasting hours on data prep! Bulk download YouTube subtitles for LLM training with YTVidHub.";
  
  const twitterTitle = "Building LLMs? 🤖 This tool bulk downloads YouTube subtitles for clean training data in seconds. Huge time saver!";
  const hashtags = ["LLM", "AI", "DataScience", "YTVidHub"];

  return (
    <div className="flex flex-row gap-4 items-center">
      {/* Twitter */}
      <TwitterShareButton url={shareUrl} title={twitterTitle} hashtags={hashtags} className="hover:scale-110 transition-transform active:scale-95">
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>

      {/* Reddit */}
      <RedditShareButton url={shareUrl} title={mainTitle} className="hover:scale-110 transition-transform active:scale-95">
        <RedditIcon size={32} round={true} />
      </RedditShareButton>

      {/* Facebook */}
      <FacebookShareButton url={shareUrl} title={mainTitle} className="hover:scale-110 transition-transform active:scale-95">
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      {/* WhatsApp */}
      <WhatsappShareButton url={shareUrl} title={mainTitle} separator=" :: " className="hover:scale-110 transition-transform active:scale-95">
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>

      {/* Telegram */}
      <TelegramShareButton url={shareUrl} title={mainTitle} className="hover:scale-110 transition-transform active:scale-95">
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton>
    </div>
  );
}