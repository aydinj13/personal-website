import { blockContentType } from "./blockContentType";
import { post } from './post'
import {testimonial} from './testimonial'
import {newsletter} from './newsletter'
import {video} from './video'
import {venture} from './venture'
import {service} from './service'
import {author} from './author'
import { profile } from "./profile";
import { achievement } from "./achievement";
import { experience } from "./experience";
import { education } from "./education";
import { portfolio } from "./portfolio";
import { featured } from "./featured";
import twitterX from "./twitterX";
import instagram from "./instagram";
import youtube from "./youtube";

export const schemaTypes = [
    blockContentType,   
    post,
    testimonial,
    newsletter,
    video,
    venture,
    service,
    profile,
    experience,
    education,
    achievement,
    author,
    portfolio,
    featured,
    twitterX,
    instagram,
    youtube,
  ];