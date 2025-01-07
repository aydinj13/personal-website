import { SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { post } from './post'
import {testimonial} from './testimonial'
import {newsletter} from './newsletter'
import {video} from './video'
import {venture} from './venture'
import {service} from './service'
import {project} from './project'
import {author} from './author'
import { profile } from "./profile";
import { achievement } from "./achievement";
import { experience } from "./experience";
import { education } from "./education";
import { portfolio } from "./portfolio";

export const schema: { Types: SchemaTypeDefinition[] } = {
  Types: [
    blockContentType,   
    post,
    testimonial,
    newsletter,
    video,
    venture,
    service,
    project,
    profile,
    experience,
    education,
    achievement,
    author,
    portfolio,
  ],
};
