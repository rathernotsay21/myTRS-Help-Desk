// @ts-check

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  helpDeskSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction'
    },
    {
      type: 'category',
      label: 'Platform Overview',
      items: [
        'overview/dashboard_navigation',
        'overview/giving_admin_access',
        'overview/reset_trs_admin_password',
        'overview/reset_volunteers_password',
        'overview/individual_registration_demonstration',
        'overview/group_registration_instructions',
        'overview/mobile_friendly_faq',
        'overview/accessibility_option',
        'overview/trs_data_privacy_faq'
      ]
    },
    {
      type: 'category',
      label: 'Registration Management',
      items: [
        {
          type: 'category',
          label: 'Registrant Reports',
          items: [
            'registration_management/registrant_reports/general_guide_to_reports',
            'registration_management/registrant_reports/registration_report',
            'registration_management/registrant_reports/availability_report',
            'registration_management/registrant_reports/registrant_communication',
            'registration_management/registrant_reports/register_for_an_existing_user',
            'registration_management/registrant_reports/update_a_registrants_schedules_profile'
          ]
        },
        'registration_management/check_ins',
        'registration_management/email_campaign_reports',
        'registration_management/financial_reports',
        'registration_management/imports',
        'registration_management/report_schedules',
        'registration_management/saved_reports',
        'registration_management/site_reports',
        'registration_management/user_accounts'
      ]
    },
    {
      type: 'category',
      label: 'Building Your Site',
      items: [
        'build_site_launch/step_1_welcome_page',
        'build_site_launch/step_2_registrant_types',
        'build_site_launch/step_3_activity_groups',
        'build_site_launch/step_4_activities_schedules',
        'build_site_launch/step_5_profile_questions',
        'build_site_launch/step_7_optional_payment_settings',
        'build_site_launch/step_8_optional_integrations',
        'build_site_launch/step_9_required_test_launch_site',
        'build_site_launch/update_a_cloned_site',
        'build_site_launch/coding_standards'
      ]
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshoot/add_images_to_activity_description',
        'troubleshoot/add_images_to_description',
        'troubleshoot/attach_files_in_email',
        'troubleshoot/check_volunteers_background_check_status',
        'troubleshoot/different_ways_to_set_up_terms_conditions',
        'troubleshoot/find_who_broke_rules',
        'troubleshoot/group_registration_instructions',
        'troubleshoot/help_desk',
        'troubleshoot/how_do_i_view_my_live_site_',
        'troubleshoot/how_to_cancel_registrations',
        'troubleshoot/how_to_open_site_for_registration',
        'troubleshoot/run_report_for_shirt_sizes',
        'troubleshoot/why_cant_guests_in_group_registration_see_certain_custom_field_questions_',
        'troubleshoot/why_volunteers_registration_is_incomplete_'
      ]
    }
  ]
};

export default sidebars;
