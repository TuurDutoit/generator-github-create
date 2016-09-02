export let readme = {
  src: '../src/generators/readme',
  deps: [],
  prompts: {
    title: 'Repository Title',
    description: 'Repository Description',
    usebadges: true,
    badges: [
      'npm',
      'travis',
      'coveralls',
      'gitter',
      'david',
      'davidDev'
    ],
    profile: 'test-profile',
    repository: 'test-repository'
  },
  options: {
    title: 'Repository Title',
    description: 'Repository Description',
    usebadges: true,
    badges: 'npm,travis,coveralls,gitter,david,davidDev',
    profile: 'test-profile',
    repository: 'test-repository'
  },
  save: {
    'generator-github-create': {
      'readme': {
        'title': 'Repository Title',
        'description': 'Repository Description',
        'badges': [
          'npm',
          'travis',
          'coveralls',
          'gitter',
          'david',
          'davidDev'
        ],
        'profile': 'test-profile',
        'repository': 'test-repository'
      }
    }
  }
};

export let orgs = {
  src: '../src/generators/orgs',
  deps: [
    [helpers.createDummyGenerator(), 'github-create:authenticate']
  ],
  prompts: {
    'skip-prompt': false,
    use: true,
    org: 'test-org'
  },
  options: {
    'skip-prompt': false,
    org: 'test-org'
  },
  save: {
    'generator-github-create': {
      'orgs': {
        'org': 'test-org'
      }
    }
  }
};

export let authenticate = {
  src: '../src/generators/authenticate',
  prompts: {
    username: 'testuser',
    saveuser: true,
    password: 'testpassword',
    twofactor: true,
    twofactorcode: 'asdf'
  },
  options: {
    debug: false
  },
  save: {
    'generator-github-create': {
      'authenticate': {
        'github': {
          'debug': false,
          'host': 'api.github.com',
          'protocol': 'https',
          'pathPrefix': '',
          'headers': {
            'user-agent': 'generator-github-create'
          },
          'scopes': 'user,public_repo,repo,repo:status'
        },
        'username': 'testuser',
        'appName': 'generator-github-create',
        'appUrl': 'https://github.com/trainerbill/generator-github-create',
        'twofactor': true
      }
    }
  }
};

export let create = {
  src: '../src/generators/create',
  deps: [
    [helpers.createDummyGenerator(), 'github-create:authenticate']
  ],
  prompts: {
    name: 'testrepository',
    description: 'Test Description',
    private: false,
    licensce: 'isc'
  },
  options: {
    debug: false,
    user: 'testuser',
    name: 'testrepository',
    description: 'Test Description',
    private: false,
    licensce: 'isc'
  },
  save: {
    'generator-github-create': {
      'create': {
        'autoinit': false,
        'name': 'testrepository',
        'description': 'Test Description',
        'private': false,
        'license': 'isc',
        'org': false,
        'user': 'testuser',
        'urls': [
          'https://test',
          'git@test'
        ]
      }
    }
  }
};

export let gitinit = {
  src: '../src/generators/gitinit',
  prompts: {
    'skip-prompt': false,
    name: 'origin',
    url: 'testurl'
  },
  options: {
    'skip-prompt': false,
    name: 'origin'
  },
  save: {
    'generator-github-create': {
      'gitinit': {
        'name': 'origin',
        'url': 'testurl'
      }
    }
  }
};
